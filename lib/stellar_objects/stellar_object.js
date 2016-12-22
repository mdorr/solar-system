const MathHelper = require ('./../helpers/mathHelper.js');

const ORBIT_POINTS = 500;

class StellarObject {
  constructor (size, tex_file, parent) {
    this.obj = new THREE.Object3D();
    this.orbit = null;
    this.orbitCurve = null;
    this.ring = null;
    this.positionOnOrbit = 0;
    parent.add(this.obj);
    this.addBody(size, tex_file);
  }

  addBody (size, tex_file) {
    let body = new THREE.Mesh(
      new THREE.SphereGeometry(size, 64, 64),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(tex_file)
      })
    );
    this.obj.add(body);
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
    if (this.orbitCurve === undefined) {
      return;
    }
    let geometryIndex = Math.round(newPositionOnOrbit * ORBIT_POINTS);
    let newPos = this.geometry.vertices[geometryIndex];
    this.obj.position.x = newPos.x;
    this.obj.position.y = newPos.y;
    this.obj.position.z = newPos.z;
  }

  update(delta) {
    this.positionOnOrbit = ((positionOnOrbit + delta) % 1);
  }
}

module.exports = StellarObject;
