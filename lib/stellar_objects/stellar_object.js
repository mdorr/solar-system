const MathHelper = require ('./../helpers/mathHelper.js');
const SimObject = require ('./simObject.js');

const ORBIT_POINTS = 500;

let hideLabel = false;

class StellarObject extends SimObject {
  constructor (size, tex_file, parent, name) {
    super();
    this.size = size;
    this.obj = new THREE.Object3D();
    this.orbit = null;
    this.orbitCurve = null;
    this.ring = null;
    this.positionOnOrbit = 0;
    this.label = undefined;
    this.name = name;
    parent.add(this.obj);
    this.addBody(size, tex_file);
    this.addLabel(this.name);
  }

  addBody (size, tex_file) {
    let body = new THREE.Mesh(
      new THREE.SphereGeometry(size, 64, 64),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(tex_file)
      })
    );
    this.obj.add(body);
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

    var path = new THREE.Path( curve.getPoints(ORBIT_POINTS) );

    var geometry = path.createPointsGeometry(ORBIT_POINTS);
    var material = new THREE.LineBasicMaterial( { color : color } );

    // Rotate orbit by 90 deg to have it sit on the correct plane, then apply inclination
    geometry.rotateX(MathHelper.degToRad(90 + inclination));

    // Create the final object to add to the scene
    this.orbit = new THREE.Line( geometry, material );

    this.geometry = geometry;
    root.obj.add(this.orbit)
  }

  addRing (innerRadius, outerRadius, tex_file, alpha_map) {
    let ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64)

    this.ring = new THREE.Mesh(
      ringGeometry,
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(tex_file),
        alphaMap: new THREE.TextureLoader().load(alpha_map),
        transparent: true
      })
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

    let v1 = new THREE.Vector3(pos1.x, pos1.y, pos1.z);
    v1.lerp(pos2, sectionPercentage);

    this.obj.position.x = v1.x;
    this.obj.position.y = v1.y;
    this.obj.position.z = v1.z;
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

    vector.set( this.obj.position.x, this.obj.position.y, this.obj.position.z );

    // map to normalized device coordinate (NDC) space
    vector.project(this.sceneManager.camera);

    // map to 2D screen space
    vector.x = Math.round( (   vector.x + 1 ) * canvas.width  / 2 );
    vector.y = Math.round( ( - vector.y + 1 ) * canvas.height / 2 );

    this.label.style.display = "block";
    this.label.style.left = (vector.x-21)+"px";
    this.label.style.top = (vector.y-21)+"px";
  }

  update(delta) {
//    this.positionOnOrbit = ((this.positionOnOrbit + delta * 10) % 1);
//    this.updatePosition(this.positionOnOrbit);
    this.updateLabel();
  }
}

module.exports = StellarObject;
