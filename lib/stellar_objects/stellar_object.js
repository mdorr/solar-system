const MathHelper = require ('./../helpers/mathHelper.js');
const SimObject = require ('./simObject.js');

const ORBIT_POINTS = 500;

let hideLabel = false;

class StellarObject extends SimObject {
  constructor (size, tex_file, parent, name, axialTilt, orbitTime = 60, unlit = false) {
    super();
    this.size = size;
    this.obj = new THREE.Object3D();
    this.orbit = null;
    this.orbitCurve = null;
    this.ring = null;
    this.label = undefined;
    this.name = name;
    parent.add(this.obj);
    this.addBody(size, tex_file, axialTilt, unlit);
    this.addLabel(this.name);
    this.positionOnOrbit = 0;
    this.movementRate = 1 / orbitTime
  }

  addBody (size, tex_file, axialTilt, unlit) {
    let geometry = new THREE.SphereGeometry(size, 64, 64);
    let material;
    if (unlit) {
      material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(tex_file)
      });
    } else {
      material = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(tex_file)
      });
    }

    let body = new THREE.Mesh(
      geometry,
      material
    );

    this.obj.add(body); // Body object will be added as child object to allow independent tilt/rotation from parent object (this.obj)

    if (axialTilt) {
      body.rotateX(MathHelper.degToRad(axialTilt));
    }

    this.body = body;
  }

  // Create an orbit. Takes the following parameters:
  // semiMajorAxis: The semi major axis of the ellipse, measured in AU
  // eccentricity: Used to calculate the semi minor axis
  // inclination: Inclination of the orbits pane relative to the sun
  // perihelion: Closest approach to the sun, measured in AU
  // root: The object this orbit is attached to. Should be the sun
  // color: The color the orbit is drawn in.
  addOrbit (semiMajorAxis, eccentricity, inclination, perihelion, root, color = 0x44444) {
    // Calculate the necessary values
    let semiMinorAxis = MathHelper.minorAxis(semiMajorAxis, eccentricity);
    let ellipseCenterX =
      root.obj.position.x - MathHelper.auToUnits((semiMajorAxis - perihelion));

    var curve = new THREE.EllipseCurve(
    	ellipseCenterX,  root.obj.position.y,
    	MathHelper.auToUnits(semiMajorAxis), MathHelper.auToUnits(semiMinorAxis),
    	0,  2 * Math.PI,  // aStartAngle, aEndAngle
    	false,            // aClockwise
    	0                 // aRotation
    );

    var path = new THREE.Path(curve.getPoints(ORBIT_POINTS));

    var geometry = path.createPointsGeometry(ORBIT_POINTS);
    var material = new THREE.LineBasicMaterial({ color : color });

    // Rotate orbit by 90 deg to have it sit on the correct plane, then apply inclination
    geometry.rotateX(MathHelper.degToRad(90 + inclination));

    // Create the final object to add to the scene
    this.orbit = new THREE.Line(geometry, material);

    this.geometry = geometry;
    root.obj.add(this.orbit)
  }

  // addRing: This is used for Saturn and Uranus and will add the ring geometry
  addRing (innerRadius, outerRadius, texFile, alphaMap) {

    let ringGeometry = new THREE.RingGeometry2(innerRadius, outerRadius, 180, 1, 0, Math.PI * 2);
    ringGeometry.computeFaceNormals();

    let material;

    // uranus texture has an alphamap, saturns texture does not.
    if (alphaMap) {
      material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(texFile),
        alphaMap: new THREE.TextureLoader().load(alphaMap),
        transparent: true,
        side: THREE.DoubleSide
      });
    } else {
      material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(texFile),
        transparent: true,
        side: THREE.DoubleSide
      });
    }

    this.ring = new THREE.Mesh(
      ringGeometry,
      material
    )
    this.obj.add(this.ring);
  }

  updatePosition (newPositionOnOrbit) {
    if (this.geometry === undefined) {
      return;
    }

    // The curve is defined as a set of points. Since we won't be exactly on
    // one of those, get the two next matchin ones
    let idxLower = Math.floor(newPositionOnOrbit * ORBIT_POINTS);
    let idxHigher = idxLower + 1;

    // calculated the distance between those two points
    let lowerSectionBound = idxLower / ORBIT_POINTS;
    let higherSectionBound = idxHigher / ORBIT_POINTS;
    let sectionSize = higherSectionBound - lowerSectionBound;

    // calculate the percentage between those points, this is used in interpolation
    let sectionPercentage = ((newPositionOnOrbit - lowerSectionBound) / sectionSize);

    if (idxHigher > ORBIT_POINTS) {
      idxHigher = 0;
    };

    let pos1 = this.geometry.vertices[idxLower];
    let pos2 = this.geometry.vertices[idxHigher];

    if (pos1 && pos2) {
      let v1 = new THREE.Vector3(pos1.x, pos1.y, pos1.z);
      v1.lerp(pos2, sectionPercentage);

      this.obj.position.x = v1.x;
      this.obj.position.y = v1.y;
      this.obj.position.z = v1.z;

      this.positionOnOrbit = newPositionOnOrbit;
    }
  }

  toggleOrbit(newState) {
    if (this.orbit) {
      this.orbit.visible = newState;
    }
  }

  addLabel(name) {
    let div = document.createElement('div');
    div.innerHTML = name;
    div.className = "label";
    this.label = document.body.appendChild(div);
  }

  updateLabel () {
    if (this.label === undefined || this.body === undefined ) {
      return;
    }

    // check if object is on screen; if not, deactivate the label attached
    if (this.hideLabel || !this.sceneManager.frustum.intersectsObject(this.body)) {
      this.label.style.display = "none";
      return;
    }

    var vector = new THREE.Vector3();
    var canvas = this.sceneManager.renderer.domElement;

    vector.set(this.obj.position.x, this.obj.position.y, this.obj.position.z);

    // map to normalized device coordinate (NDC) space
    vector.project(this.sceneManager.camera);

    // map to 2D screen space
    vector.x = Math.round((vector.x + 1) * canvas.width  / 2);
    vector.y = Math.round((-vector.y + 1) * canvas.height / 2);

    this.label.style.display = "block";
    this.label.style.left = (vector.x-21)+"px";
    this.label.style.top = (vector.y-21)+"px";
  }

  update(delta) {
    this.updateLabel();
    this.body.rotateY(delta * 0.15);
    if (this.sceneManager.movePlanets) {
      let positionDelta = delta * this.movementRate;
      this.updatePosition((this.positionOnOrbit + positionDelta) % 1);
    }
  }
}

module.exports = StellarObject;
