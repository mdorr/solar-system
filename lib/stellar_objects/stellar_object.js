const MathHelper = require ('./../helpers/mathHelper.js');

class StellarObject {
  constructor (size, tex_file, parent) {
    this.obj = new THREE.Object3D();
    this.addBody(size, tex_file);
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


  addOrbit (semiMajorAxis, eccentricity, inclination, root) {
    let semiMinorAxis = MathHelper.minorAxis(semiMajorAxis, eccentricity);

    var curve = new THREE.EllipseCurve(
    	root.obj.position.x,  root.obj.position.y,
    	MathHelper.auToUnits(semiMajorAxis), MathHelper.auToUnits(semiMinorAxis),
    	0,  2 * Math.PI,  // aStartAngle, aEndAngle
    	false,            // aClockwise
    	0                 // aRotation
    );

    var path = new THREE.Path( curve.getPoints( 500 ) );
    var geometry = path.createPointsGeometry( 500 );
    var material = new THREE.LineBasicMaterial( { color : 0x444444 } );

    // Create the final object to add to the scene
    var orbit = new THREE.Line( geometry, material );

    // Rotate orbit by 90 deg to have it sit on the correct plane, then apply inclination
    orbit.rotateX(MathHelper.degToRad(90 + inclination));

    root.obj.add( orbit )
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
