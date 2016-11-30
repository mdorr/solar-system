var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var earth_geometry = new THREE.SphereGeometry( 6.371 , 64, 64 );
var earth_diffuse = new THREE.TextureLoader().load( "./textures/earth/earth_diffuse.jpg" );
var earth_material = new THREE.MeshBasicMaterial( { map: earth_diffuse } );
var earth = new THREE.Mesh( earth_geometry, earth_material );
scene.add( earth );



var moon_geometry = new THREE.SphereGeometry( 1.7371 , 64, 64 );
var moon_diffuse = new THREE.TextureLoader().load( "./textures/moon/moon_diffuse.jpg" );
var moon_material = new THREE.MeshBasicMaterial( { map: moon_diffuse } );
var moon = new THREE.Mesh( moon_geometry, moon_material );

earth.add( moon ) // Add moon to earth: This will set the earth object as the pivot for rotation

moon.position.x = 38.44; // correct value: 384.4

camera.position.z = 50;

controls = new THREE.OrbitControls(camera, renderer.domElement);

var render = function () {
  requestAnimationFrame( render );

  earth.rotation.y += 0.0025;
  moon.rotation.y += 0.0025;

  renderer.render(scene, camera);
  controls.update();
};

render();
