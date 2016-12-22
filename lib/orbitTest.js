var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 10, 1000000000 );

const clock = new THREE.Clock();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var curve = new THREE.EllipseCurve(
  0,  0,
  10, 10,
  0,  2 * Math.PI,  // aStartAngle, aEndAngle
  false,            // aClockwise
  0                 // aRotation
);

var path = new THREE.Path( curve.getPoints( 200 ) );
var geometry = path.createPointsGeometry( 200 );
var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
var orbit = new THREE.Line( geometry, material );

scene.add(orbit);

controls = new THREE.OrbitControls(camera, renderer.domElement);


var render = function () {
  time = clock.getElapsedTime();
  delta = clock.getDelta();

  requestAnimationFrame( render );

  renderer.render(scene, camera);
  controls.update();
};

render();
