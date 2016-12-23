const StellarObject = require ('./stellar_objects/stellar_object.js');
const MathHelper = require ('./helpers/mathHelper.js');
const SceneManager = require ('./scene/sceneManager.js');

SceneManager.initScene();

const sun = new StellarObject(
  695.7,
  "./textures/sun/sun_diffuse.jpg",
  SceneManager.scene,
  "Sun"
)
sun.obj.position.x = 1; // Hack to prevent issue with controls; Orbitcontrols fail when position is (0,0,0)

const mercury = new StellarObject(
  2.4397,
  "./textures/mercury/mercury_diffuse.jpg",
  sun.obj,
  "Mercury"
)
mercury.addOrbit(0.3871, 0.20563, 3.38, 0.3075, sun, 0x616569);
mercury.updatePosition(0);

const venus = new StellarObject(
  6.052,
  "./textures/venus/venus_diffuse.jpg",
  sun.obj,
  "Venus"
)

venus.addOrbit(0.7233, 0.0067, 3.86, 0.7184, sun, 0x8f8d77);
venus.updatePosition(0);

const earth = new StellarObject(
  6.371,
  "./textures/earth/earth_diffuse.jpg",
  sun.obj,
  "Earth"
)
earth.obj.position.x += 1;

earth.addOrbit(1, 0.0167, 7.16, 0.9833, sun, 0x4d65a4);
earth.updatePosition(0);

// const moon = new StellarObject(
//   1.7371,
//   "./textures/moon/moon_diffuse.jpg",
//   earth.obj
// )
// moon.obj.position.x = 38.44; // correct value: 384.4

const mars = new StellarObject(
  3.3895,
  "./textures/mars/mars_diffuse.jpg",
  sun.obj,
  "Mars"
)
mars.addOrbit(1.524 , 0.0934, 5.65, 1.3814, sun, 0x79260f);
mars.updatePosition(0);

const jupiter = new StellarObject(
  69.911,
  "./textures/jupiter/jupiter_diffuse.jpg",
  sun.obj,
  "Jupiter"
)
jupiter.addOrbit(5.2026, 0.048498, 6.09, 4.95029, sun, 0xd4b48d);
jupiter.updatePosition(0);

const saturn = new StellarObject(
  58.262,
  "./textures/saturn/saturn_diffuse.jpg",
  sun.obj,
  "Saturn"
)

saturn.addRing(
  (58.262 + 6.630),
  (58.262 + 120.7),
  "./textures/saturn/saturn_ring_diffuse.jpg",
  "./textures/saturn/saturn_ring_trans.jpg"
);

saturn.ring.rotation.x = -45;
saturn.addOrbit(9.5549, 0.05555, 5.51, 9.024, sun, 0xceaf58);
saturn.updatePosition(0);

const uranus = new StellarObject(
  25.362,
  "./textures/uranus/uranus_diffuse.jpg",
  sun.obj,
  "Uranus"
)

uranus.addRing(
  (25.362 + 26.840),
  (25.362 + 103),
  "./textures/uranus/uranus_ring_diffuse.jpg",
  "./textures/uranus/uranus_ring_trans.jpg"
);

uranus.ring.rotation.x = -45;
uranus.addOrbit(19.2184, 0.04638, 6.48, 18.33, sun, 0xc2edee);
uranus.updatePosition(0);

const neptune = new StellarObject(
  24.622,
  "./textures/neptune/neptune_diffuse.jpg",
  sun.obj,
  "Neptune"
)

neptune.addOrbit(30.1104, 0.0094, 6.34, 29.81, sun, 0x3448ff);
neptune.updatePosition(0);

const pluto = new StellarObject(
  1.187,
  "./textures/pluto/pluto_diffuse.jpg",
  sun.obj,
  "Pluto"
)
pluto.addOrbit(39.48, 0.2488, 17.16, 29.659, sun, 0xc29a6d);
pluto.updatePosition(0);

SceneManager.controls.target = sun.obj.position;

window.earth = earth;
window.sceneManager = SceneManager;

SceneManager.camera.position.x = -309000;
SceneManager.camera.position.y = 441000;
SceneManager.camera.position.z = 236000;
