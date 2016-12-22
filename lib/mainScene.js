const StellarObject = require ('./stellar_objects/stellar_object.js');
const MathHelper = require ('./helpers/mathHelper.js');


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 10, 1000000000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const clock = new THREE.Clock();

const sun = new StellarObject(
  695.7,
  "./textures/sun/sun_diffuse.jpg",
  scene
)

const mercury = new StellarObject(
  2.4397,
  "./textures/mercury/mercury_diffuse.jpg",
  sun.obj
)
mercury.addOrbit(0.3871, 0.20563, 3.38, sun);

const venus = new StellarObject(
  6.052,
  "./textures/venus/venus_diffuse.jpg",
  sun.obj
)

venus.addOrbit(0.7233, 0.0067, 3.86, sun);

const earth = new StellarObject(
  6.371,
  "./textures/earth/earth_diffuse.jpg",
  sun.obj
)

earth.addOrbit(1, 0.0167, 7.16, sun);
earth.obj.position.x = 1500;

const moon = new StellarObject(
  1.7371,
  "./textures/moon/moon_diffuse.jpg",
  earth.obj
)
moon.obj.position.x = 38.44; // correct value: 384.4

const mars = new StellarObject(
  3.3895,
  "./textures/mars/mars_diffuse.jpg",
  sun.obj
)
mars.obj.position.x = 2000;

mars.addOrbit(1.524 , 0.0934, 5.65, sun);


const jupiter = new StellarObject(
  69.911,
  "./textures/jupiter/jupiter_diffuse.jpg",
  sun.obj
)

jupiter.addOrbit(5.2026, 0.048498, 6.09, sun);

const saturn = new StellarObject(
  58.262,
  "./textures/saturn/saturn_diffuse.jpg",
  sun.obj
)

saturn.addRing(
  (58.262 + 6.630),
  (58.262 + 120.7),
  "./textures/saturn/saturn_ring_diffuse.jpg",
  "./textures/saturn/saturn_ring_trans.jpg"
);

saturn.obj.position.x = 2750;
saturn.ring.rotation.x = -45;

saturn.addOrbit(9.5549, 0.05555, 5.51, sun);


const uranus = new StellarObject(
  25.362,
  "./textures/uranus/uranus_diffuse.jpg",
  sun.obj
)

uranus.addRing(
  (25.362 + 26.840),
  (25.362 + 103),
  "./textures/uranus/uranus_ring_diffuse.jpg",
  "./textures/uranus/uranus_ring_trans.jpg"
);

uranus.obj.position.x = 3000;
uranus.ring.rotation.x = -45;

uranus.addOrbit(19.2184, 0.04638, 6.48, sun);




const neptune = new StellarObject(
  24.622,
  "./textures/neptune/neptune_diffuse.jpg",
  sun.obj
)
neptune.obj.position.x = 3250;

neptune.addOrbit(30.1104, 0.0094, 6.34, sun);

const pluto = new StellarObject(
  1.187,
  "./textures/pluto/pluto_diffuse.jpg",
  sun.obj
)
pluto.obj.position.x = 3500;

pluto.addOrbit(39.48, 0.2488, 17.16, sun);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target = earth.obj.position;
camera.position = earth.position;


window.MathHelper = MathHelper;

//earthOrbit.rotateX(MathHelper.degToRad(90));
// Create an event listener that resizes the renderer with the browser window.
window.addEventListener('resize', function() {
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
});

let time = clock.getElapsedTime();
let delta = clock.getDelta();

var render = function () {
  time = clock.getElapsedTime();
  delta = clock.getDelta();

  requestAnimationFrame( render );


  renderer.render(scene, camera);
  controls.update();
};

render();
