const StellarObject = require ('./stellar_objects/stellar_object.js');
const SkySphere = require ('./stellar_objects/skysphere.js');
const MathHelper = require ('./helpers/mathHelper.js');
const SceneManager = require ('./scene/sceneManager.js');
const InputManager = require ('./scene/inputManager.js');

SceneManager.initScene();

const sun = new StellarObject(
  695.7,
  "./textures/sun/sun_diffuse.jpg",
  SceneManager.scene,
  "Sun",
  0,
  1000,
  true
)
sun.obj.position.x = 1; // Hack to prevent issue with controls; Orbitcontrols fail when position is (0,0,0)

SceneManager.planets.push(sun);

const mercury = new StellarObject(
  2.4397,
  "./textures/mercury/mercury_diffuse.jpg",
  sun.obj,
  "Mercury",
  0.01,
  14
)
mercury.addOrbit(0.3871, 0.20563, 3.38, 0.3075, sun, 0x616569);
mercury.updatePosition(0.7);

SceneManager.planets.push(mercury);

const venus = new StellarObject(
  6.052,
  "./textures/venus/venus_diffuse.jpg",
  sun.obj,
  "Venus",
  2.64,
  37
)

venus.addOrbit(0.7233, 0.0067, 3.86, 0.7184, sun, 0x8f8d77);
venus.updatePosition(0.825);

SceneManager.planets.push(venus);


const earth = new StellarObject(
  6.371,
  "./textures/earth/earth_diffuse.jpg",
  sun.obj,
  "Earth",
  23.93,
  60
)
earth.obj.position.x += 1;

earth.addOrbit(1, 0.0167, 7.16, 0.9833, sun, 0x4d65a4);
earth.updatePosition(0.73);

SceneManager.planets.push(earth);

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
  "Mars",
  25.19,
  113
)
mars.addOrbit(1.524 , 0.0934, 5.65, 1.3814, sun, 0x79260f);
mars.updatePosition(0.9);

SceneManager.planets.push(mars);

const jupiter = new StellarObject(
  69.911,
  "./textures/jupiter/jupiter_diffuse.jpg",
  sun.obj,
  "Jupiter",
  3.12,
  712
)
jupiter.addOrbit(5.2026, 0.048498, 6.09, 4.95029, sun, 0xd4b48d);
jupiter.updatePosition(0.45);

SceneManager.planets.push(jupiter);

const saturn = new StellarObject(
  58.262,
  "./textures/saturn/saturn_diffuse.jpg",
  sun.obj,
  "Saturn",
  26.73,
  1769
)

saturn.addRing(
  (58.262 + 6.630),
  (58.262 + 120.7),
  "./textures/saturn/saturn_ring_diffuse.png"
);

saturn.ring.rotation.x = -45;
saturn.addOrbit(9.5549, 0.05555, 5.51, 9.024, sun, 0xceaf58);
saturn.updatePosition(0.275);

SceneManager.planets.push(saturn);

const uranus = new StellarObject(
  25.362,
  "./textures/uranus/uranus_diffuse.jpg",
  sun.obj,
  "Uranus",
  82.23,
  5045
)

uranus.addRing(
  (25.362 + 26.840),
  (25.362 + 103),
  "./textures/uranus/uranus_ring_diffuse.jpg",
  "./textures/uranus/uranus_ring_trans.jpg"
);

uranus.ring.rotation.x = -45;
uranus.addOrbit(19.2184, 0.04638, 6.48, 18.33, sun, 0xc2edee);
uranus.updatePosition(0.85);
SceneManager.planets.push(uranus);

const neptune = new StellarObject(
  24.622,
  "./textures/neptune/neptune_diffuse.jpg",
  sun.obj,
  "Neptune",
  28.33,
  9893
)

neptune.addOrbit(30.1104, 0.0094, 6.34, 29.81, sun, 0x3448ff);
neptune.updatePosition(0.12);
SceneManager.planets.push(neptune);

const pluto = new StellarObject(
  1.187,
  "./textures/pluto/pluto_diffuse.jpg",
  sun.obj,
  "Pluto",
  60.41,
  14887
)
pluto.addOrbit(39.48, 0.2488, 17.16, 29.659, sun, 0xc29a6d);
pluto.updatePosition(0.2);
SceneManager.planets.push(pluto);

const skysphere = new SkySphere(
  "./textures/stars/starsphere.jpg",
  SceneManager.scene
);

let light = new THREE.PointLight(0xffffff, 1, 0, 0)
light.position.set(0, 0, 0);
SceneManager.scene.add(light);

let ambientLight = new THREE.AmbientLight(0x2f2a1b);
SceneManager.scene.add(ambientLight);

window.earth = earth;
window.sceneManager = SceneManager;
window.inputManager = InputManager;

InputManager.resetControls();
