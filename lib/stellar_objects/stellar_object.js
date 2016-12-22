const MathHelper = require ('./../helpers/mathHelper.js');

class StellarObject {
  constructor (size, tex_file, parent) {
    this.obj = new THREE.Object3D();
    this.addBody(size, tex_file);
    this.orbit = null;
    this.ring = null;
    parent.add(this.obj);
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

    var path = new THREE.Path( curve.getPoints( 500 ) );
    var geometry = path.createPointsGeometry( 500 );
    var material = new THREE.LineBasicMaterial( { color : color } );

    // Create the final object to add to the scene
    this.orbit = new THREE.Line( geometry, material );

    // Rotate orbit by 90 deg to have it sit on the correct plane, then apply inclination
    this.orbit.rotateX(MathHelper.degToRad(90 + inclination));

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
}

module.exports = StellarObject;
