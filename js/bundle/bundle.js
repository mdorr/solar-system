/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const StellarObject = __webpack_require__ (1);
	const SkySphere = __webpack_require__ (5);
	const MathHelper = __webpack_require__ (2);
	const SceneManager = __webpack_require__ (4);
	const InputManager = __webpack_require__ (6);
	
	setupScene = function () {
	  SceneManager.initScene();
	
	  const sun = new StellarObject(
	    695.7,
	    "./textures/sun/sun_diffuse.jpg",
	    SceneManager.scene,
	    "The Sun",
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
	
	  InputManager.receiveTargetName("The Solar System");
	
	  let loader = document.getElementById('loader');
	  loader.remove();
	}
	
	window.setupScene = setupScene;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const MathHelper = __webpack_require__ (2);
	const SimObject = __webpack_require__ (3);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	const degToRad = function (deg) {
	  return deg * (Math.PI / 180);
	}
	
	const radToDeg = function (rad) {
	  return rad * (180 / Math.PI);
	}
	
	const auToUnits = function (au) {
	  return au * 149597.8707;
	}
	
	const minorAxis = function (majorAxis, eccentricity) {
	  return majorAxis * Math.sqrt(1 - Math.pow(eccentricity, 2));
	}
	
	module.exports = {
	  degToRad: degToRad,
	  radToDeg: radToDeg,
	  auToUnits: auToUnits,
	  minorAxis: minorAxis,
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const SceneManager = __webpack_require__ (4);
	
	class SimObject {
	  constructor () {
	    this.obj = new THREE.Object3D();
	    this.sceneManager = SceneManager;
	    SceneManager.initSimObject(this);
	  };
	
	  // Update is called once per frame
	  update (delta) { }
	}
	
	module.exports = SimObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	// Set up references
	const scene = new THREE.Scene();
	const clock = new THREE.Clock();
	const camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 10, 100000000 );
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	var frustum = new THREE.Frustum();
	var cameraViewProjectionMatrix = new THREE.Matrix4();
	
	let planets = [];
	let simObjects = [];
	let rootObject = null;
	let movePlanets = true;
	
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	const initScene = function () {
	  // Set size to fullscreen
	  renderer.setSize(window.innerWidth, window.innerHeight);
	
	  // append renderer to document
	  document.body.appendChild(renderer.domElement);
	
	  // Create an event listener that resizes the renderer with the browser window.
	  window.addEventListener('resize', function() {
	    var WIDTH = window.innerWidth,
	        HEIGHT = window.innerHeight;
	    renderer.setSize(WIDTH, HEIGHT);
	    camera.aspect = WIDTH / HEIGHT;
	    camera.updateProjectionMatrix();
	  });
	
	  this.rootObject = new THREE.Object3D();
	  this.rootObject.position.x = 1;
	
	  controls.target = this.rootObject.position;
	
	  controls.enableKeys = false;
	
	  // Start simulation and render loop
	  render();
	}
	
	const render = function () {
	  delta = clock.getDelta();
	  requestAnimationFrame(render);
	
	  // Update camera matrix and get current frustum. This is required to check if any objects are currently out of bounds
	  camera.updateMatrixWorld();
	  camera.matrixWorldInverse.getInverse(camera.matrixWorld);
	  cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
	  frustum.setFromMatrix(cameraViewProjectionMatrix);
	
	  // Update all active simulation objects with the current delta
	  simObjects.forEach(obj => {
	    obj.update(delta);
	  })
	
	  controls.update();
	
	  renderer.render(scene, camera);
	}
	
	const initSimObject = function (newObject) {
	  simObjects.push(newObject);
	}
	
	module.exports = {
	  initScene: initScene,
	  scene: scene,
	  clock: clock,
	  camera: camera,
	  renderer: renderer,
	  initSimObject: initSimObject,
	  controls: controls,
	  frustum: frustum,
	  planets: planets,
	  rootObject: rootObject,
	  movePlanets: movePlanets
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MathHelper = __webpack_require__ (2);
	const SimObject = __webpack_require__ (3);
	
	const SKYSPHERE_SIZE_AU = 70;
	
	class SkySphere extends SimObject {
	  constructor (tex_file, parent) {
	    super();
	
	    let geometry = new THREE.SphereGeometry(MathHelper.auToUnits(SKYSPHERE_SIZE_AU), 32, 32);
	
	    let uniforms = {
	      texture: { type: 't', value: new THREE.TextureLoader().load(tex_file) }
	    };
	
	    let material = new THREE.ShaderMaterial( {
	      uniforms:       uniforms,
	      vertexShader:   document.getElementById('sky-vertex').innerHTML,
	      fragmentShader: document.getElementById('sky-fragment').innerHTML
	    });
	
	    let skysphere = new THREE.Mesh(geometry, material);
	
	    skysphere.scale.set(-1, 1, 1);
	    skysphere.rotation.order = 'XZY';
	    skysphere.renderDepth = 1000.0;
	
	    parent.add(skysphere);
	  }
	}
	
	module.exports = SkySphere;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const SceneManager = __webpack_require__ (4);
	const MathHelper = __webpack_require__ (2);
	const SoDetails = __webpack_require__ (7);
	
	let targetedObject = null;
	let targetName = "The Solar System";
	
	const receiveTargetName = function (targetName) {
	  for (let i = 0; i < SceneManager.planets.length; i++) {
	    if (SceneManager.planets[i].name == targetName) {
	      targetPlanet(SceneManager.planets[i]);
	      return;
	    }
	  }
	  //only called if no planet found
	  targetArea(targetName);
	}
	
	const unselectCurrentTarget = function () {
	  if (targetedObject) {
	    targetedObject.hideLabel = false;
	    targetedObject.toggleOrbit (true);
	    targetedObject = "";
	    targetName = "";
	  }
	}
	
	const targetArea = function (tName) {
	  switch (tName) {
	    case "The Solar System":
	    case "The Outer Planets":
	      unselectCurrentTarget();
	      targetName = tName;
	      resetControls();
	      updateButtons(targetName);
	    break;
	    case "The Inner Planets":
	      unselectCurrentTarget();
	      targetName = tName;
	      resetControls();
	      SceneManager.camera.position.set(150375, 434724, 241257);
	      updateButtons(targetName);
	    break;
	  }
	}
	
	const targetPlanet = function (target) {
	  if (target === targetedObject) {
	    return;
	  }
	  unselectCurrentTarget();
	
	  resetControls();
	
	  targetedObject = target;
	  targetName = target.name;
	
	  updateButtons(targetName);
	
	  target.hideLabel = true;
	  target.toggleOrbit(false);
	
	  let newCamPos = targetedObject.obj.position.clone();
	
	  let distance = Math.max(20, target.size * 1.5);
	  SceneManager.controls.minDistance = distance;
	  SceneManager.controls.maxDistance = distance * 5;
	
	  SceneManager.camera.position.set(newCamPos.x + distance, newCamPos.y + distance, newCamPos.z + distance);
	
	  SceneManager.controls.target = targetedObject.obj.position;
	
	  SceneManager.movePlanets = false; //Prevent jittery animation when moving planets while zoomed in
	}
	
	const updateButtons = function (targetName) {
	  let title = document.getElementById('title');
	
	  if (title && targetName) {
	    title.innerHTML = targetName;
	  }
	}
	
	const showDetails = function () {
	  let overlay = document.getElementById('overlay');
	  let details = document.getElementById('details');
	
	  if (overlay && details && targetName) {
	    overlay.className = "overlay";
	    details.className = "details";
	    details.innerHTML = SoDetails.getDetails(targetName);
	  }
	}
	
	const hideDetails = function () {
	  let overlay = document.getElementById('overlay');
	  let details = document.getElementById('details');
	
	  if (overlay && details) {
	    overlay.className = "";
	    details.className = "";
	    details.innerHTML = "";
	  }
	}
	
	const resetControls = function () {
	  if (targetedObject) {
	    targetedObject.hideLabel = false;
	    targetedObject.toggleOrbit(true);
	  }
	  targetedObject = null;
	  updateButtons();
	  SceneManager.controls.target = SceneManager.rootObject.position;
	  SceneManager.controls.minDistance = 50;
	  SceneManager.controls.maxDistance = MathHelper.auToUnits(50);
	
	  SceneManager.movePlanets = true;
	
	  // Default camera settings
	  SceneManager.camera.position.x = 6884494;
	  SceneManager.camera.position.y = 2109691;
	  SceneManager.camera.position.z = -2025282;
	
	
	
	}
	
	module.exports = {
	  receiveTargetName: receiveTargetName,
	  resetControls: resetControls,
	  showDetails: showDetails,
	  hideDetails: hideDetails
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	const getDetails = function (name) {
	  switch (name) {
	    case "The Solar System":
	      return(`
	        <h1>The Solar System</h1>
	        <p>The Solar System is the gravitationally bound system comprising the Sun and the objects that orbit it, either directly or indirectly. Of those objects that orbit the Sun directly, the largest eight are the planets, with the remainder being significantly smaller objects, such as dwarf planets and small Solar System bodies. Of the objects that orbit the Sun indirectly, the moons, two are larger than the smallest planet, Mercury.</p>
	
	        <p>The Solar System formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud. The vast majority of the system's mass is in the Sun, with most of the remaining mass contained in Jupiter. The four smaller inner planets, Mercury, Venus, Earth and Mars, are terrestrial planets, being primarily composed of rock and metal. The four outer planets are giant planets, being substantially more massive than the terrestrials. The two largest, Jupiter and Saturn, are gas giants, being composed mainly of hydrogen and helium; the two outermost planets, Uranus and Neptune, are ice giants, being composed mostly of substances with relatively high melting points compared with hydrogen and helium, called volatiles, such as water, ammonia and methane. All planets have almost circular orbits that lie within a nearly flat disc called the ecliptic.</p>
	
	        <p>The Solar System also contains smaller objects. The asteroid belt, which lies between the orbits of Mars and Jupiter, mostly contains objects composed, like the terrestrial planets, of rock and metal. Beyond Neptune's orbit lie the Kuiper belt and scattered disc, which are populations of trans-Neptunian objects composed mostly of ices, and beyond them a newly discovered population of sednoids. Within these populations are several dozen to possibly tens of thousands of objects large enough that they have been rounded by their own gravity. Such objects are categorized as dwarf planets. Identified dwarf planets include the asteroid Ceres and the trans-Neptunian objects Pluto and Eris. In addition to these two regions, various other small-body populations, including comets, centaurs and interplanetary dust clouds, freely travel between regions. Six of the planets, at least four of the dwarf planets, and many of the smaller bodies are orbited by natural satellites, usually termed "moons" after the Moon. Each of the outer planets is encircled by planetary rings of dust and other small objects.</p>
	
	        <p>The solar wind, a stream of charged particles flowing outwards from the Sun, creates a bubble-like region in the interstellar medium known as the heliosphere. The heliopause is the point at which pressure from the solar wind is equal to the opposing pressure of the interstellar medium; it extends out to the edge of the scattered disc. The Oort cloud, which is thought to be the source for long-period comets, may also exist at a distance roughly a thousand times further than the heliosphere. The Solar System is located in the Orion Arm, 26,000 light-years from the center of the Milky Way.</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Sun">Read more on Wikipedia</a></p>
	      `);
	    case "The Inner Planets":
	      return(`
	        <h1>The Inner Planets</h1>
	
	        <p>The four terrestrial or inner planets have dense, rocky compositions, few or no moons, and no ring systems. They are composed largely of refractory minerals, such as the silicates, which form their crusts and mantles, and metals, such as iron and nickel, which form their cores. Three of the four inner planets (Venus, Earth and Mars) have atmospheres substantial enough to generate weather; all have impact craters and tectonic surface features, such as rift valleys and volcanoes.</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Sun">Read more on Wikipedia</a></p>
	      `);
	    case "The Outer Planets":
	      return(`
	        <h1>The Outer Planets</h1>
	        <p>The four outer planets, or giant planets (sometimes called Jovian planets), collectively make up 99% of the mass known to orbit the Sun. Jupiter and Saturn are together over 400 times the mass of Earth and consist overwhelmingly of hydrogen and helium; Uranus and Neptune are far less massive (<20 Earth masses each) and are composed primarily of ices. For these reasons, some astronomers suggest they belong in their own category, "ice giants". All four giant planets have rings, although only Saturn's ring system is easily observed from Earth. The term superior planet designates planets outside Earth's orbit and thus includes both the outer planets and Mars.</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Sun">Read more on Wikipedia</a></p>
	      `);
	    case "The Sun":
	      return (`
	        <h1>The Sun</h1>
	        <p>The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field via a dynamo process. It is by far the most important source of energy for life on Earth. Its diameter is about 109 times that of Earth, and its mass is about 330,000 times that of Earth, accounting for about 99.86% of the total mass of the Solar System. About three quarters of the Sun's mass consists of hydrogen (~73%); the rest is mostly helium (~25%), with much smaller quantities of heavier elements, including oxygen, carbon, neon, and iron.</p>
	
	        <p>The Sun is a G-type main-sequence star (G2V) based on its spectral class, and is informally referred to as a yellow dwarf. It formed approximately 4.6 billion years ago from the gravitational collapse of matter within a region of a large molecular cloud. Most of this matter gathered in the center, whereas the rest flattened into an orbiting disk that became the Solar System. The central mass became so hot and dense that it eventually initiated nuclear fusion in its core. It is thought that almost all stars form by this process.</p>
	
	        <p>The Sun is roughly middle-aged: it has not changed dramatically for more than four billion years, and will remain fairly stable for more than another five billion years. After hydrogen fusion in its core has stopped, the Sun will undergo severe changes and become a red giant. It is calculated that the Sun will become sufficiently large to engulf the current orbits of Mercury, Venus, and possibly Earth.</p>
	
	        <p>The enormous effect of the Sun on Earth has been recognized since prehistoric times, and the Sun has been regarded by some cultures as a deity. The synodic rotation of Earth and its orbit around the Sun are the basis of the solar calendar, which is the predominant calendar in use today.</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Sun">Read more on Wikipedia</a></p>
	      `);
	    case "Mercury":
	      return (`
	        <h1>Mercury</h1>
	        <p>Mercury is the smallest and innermost planet in the Solar System. Its orbital period (about 88 Earth days) is less than any other planet in the Solar System. Seen from Earth, it appears to move around its orbit in about 116 days. It has no known natural satellites. It is named after the Roman deity Mercury, the messenger to the gods.</p>
	
	        <p>Partly because it has almost no atmosphere to retain heat, Mercury's surface temperature varies diurnally more than any other planet in the Solar System, ranging from 100 K (−173 °C; −280 °F) at night to 700 K (427 °C; 800 °F) during the day in some equatorial regions. The poles are constantly below 180 K (−93 °C; −136 °F). Mercury's axis has the smallest tilt of any of the Solar System's planets (about  1⁄30 degree), and its orbital eccentricity is the largest of all known planets in the Solar System. At aphelion, Mercury is about 1.5 times as far from the Sun as it is at perihelion. Mercury's surface is heavily cratered and similar in appearance to the Moon, indicating that it has been geologically inactive for billions of years.</p>
	
	        <p>Mercury is tidally or gravitationally locked with the Sun in a 3:2 resonance, and rotates in a way that is unique in the Solar System. As seen relative to the fixed stars, it rotates on its axis exactly three times for every two revolutions it makes around the Sun. As seen from the Sun, in a frame of reference that rotates with the orbital motion, it appears to rotate only once every two Mercurian years. An observer on Mercury would therefore see only one day every two years.</p>
	
	        <p>Because Mercury orbits the Sun within Earth's orbit (as does Venus), it can appear in Earth's sky in the morning or the evening, but not in the middle of the night. Also, like Venus and the Moon, it displays a complete range of phases as it moves around its orbit relative to Earth. Although Mercury can appear as a bright object when viewed from Earth, its proximity to the Sun makes it more difficult to see than Venus. Two spacecraft have visited Mercury: Mariner 10 flew by in 1974 and 1975; and MESSENGER, launched in 2004, orbited Mercury over 4,000 times in four years, before exhausting its fuel and crashing into the planet's surface on April 30, 2015.</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Mercury_(planet)">Read more on Wikipedia</a></p>
	      `);
	    case "Venus":
	      return (`
	        <h1>Venus</h1>
	        <p>Venus is the second planet from the Sun, orbiting it every 224.7 Earth days. It has the longest rotation period (243 days) of any planet in the Solar System and rotates in the opposite direction to most other planets. It has no natural satellite. It is named after the Roman goddess of love and beauty. It is the second-brightest natural object in the night sky after the Moon, reaching an apparent magnitude of −4.6, bright enough to cast shadows. Because Venus orbits within Earth's orbit it is an inferior planet and never appears to venture far from the Sun; its maximum angular distance from the Sun (elongation) is 47.8°.</p>
	
	        <p>Venus is a terrestrial planet and is sometimes called Earth's "sister planet" because of their similar size, mass, proximity to the Sun, and bulk composition. It is radically different from Earth in other respects. It has the densest atmosphere of the four terrestrial planets, consisting of more than 96% carbon dioxide. The atmospheric pressure at the planet's surface is 92 times that of Earth, or roughly the pressure found 900 m (3,000 ft) underwater on Earth. Venus is by far the hottest planet in the Solar System, with a mean surface temperature of 735 K (462 °C; 863 °F), even though Mercury is closer to the Sun. Venus is shrouded by an opaque layer of highly reflective clouds of sulfuric acid, preventing its surface from being seen from space in visible light. It may have had water oceans in the past, but these would have vaporized as the temperature rose due to a runaway greenhouse effect. The water has probably photodissociated, and the free hydrogen has been swept into interplanetary space by the solar wind because of the lack of a planetary magnetic field. Venus's surface is a dry desertscape interspersed with slab-like rocks and is periodically resurfaced by volcanism.</p>
	
	        <p>As one of the brightest objects in the sky, Venus has been a major fixture in human culture for as long as records have existed. It has been made sacred to gods of many cultures, and has been a prime inspiration for writers and poets as the "morning star" and "evening star". Venus was the first planet to have its motions plotted across the sky, as early as the second millennium BC, and was a prime target for early interplanetary exploration as the closest planet to Earth. It was the first planet beyond Earth visited by a spacecraft (Mariner 2) in 1962, and the first to be successfully landed on (by Venera 7) in 1970. Venus's thick clouds render observation of its surface impossible in visible light, and the first detailed maps did not emerge until the arrival of the Magellan orbiter in 1991. Plans have been proposed for rovers or more complex missions, but they are hindered by Venus's hostile surface conditions.</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Venus">Read more on Wikipedia</a></p>
	      `);
	    case "Earth":
	      return (`
	        <h1>The Earth</h1>
	        <p>Earth, otherwise known as the world, is the third planet from the Sun and the only object in the Universe known to harbor life. It is the densest planet in the Solar System and the largest of the four terrestrial planets.</p>
	
	        <p>According to radiometric dating and other sources of evidence, Earth formed about 4.54 billion years ago. Earth's gravity interacts with other objects in space, especially the Sun and the Moon. During one orbit around the Sun (one year), Earth rotates about its axis, creating 365.26 days. Earth's axis of rotation is tilted, producing seasonal variations on the planet's surface. Earth has only one moon. The gravitational interaction between the Earth and Moon causes ocean tides, stabilizes the Earth's orientation on its axis, and gradually slows its rotation.</p>
	
	        <p>Earth's lithosphere is divided into several rigid tectonic plates that migrate across the surface over periods of many millions of years. Seventy-one percent of Earth's surface is covered with water. The remaining 29% is land consisting of continents and islands that together have many lakes, rivers and other sources of water that contribute to the hydrosphere. The majority of Earth's polar regions are covered in ice, including the Antarctic ice sheet and the sea ice of the Arctic ice pack. Earth's interior remains active with a solid iron inner core, a liquid outer core that generates the Earth's magnetic field, and a convecting mantle that drives plate tectonics.</p>
	
	        <p>Within the first billion years of Earth's history, life appeared in the oceans and began to affect the Earth's atmosphere and surface, leading to the proliferation of aerobic and anaerobic organisms. Some geological evidence indicates that life may have arisen as much as 4.1 billion years ago. Since then, the combination of Earth's distance from the Sun, physical properties, and geological history have allowed life to evolve and thrive. In the history of the Earth, biodiversity has gone through long periods of expansion, occasionally punctuated by mass extinction events. Over 99% of all species that ever lived on Earth are extinct. Estimates of the number of species on Earth today vary widely; most species have not been described. Over 7.3 billion humans live on Earth and depend on its biosphere and minerals for their survival. Humanity has developed diverse societies and cultures; politically, the world is divided into about 200 sovereign states.</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Earth">Read more on Wikipedia</a></p>
	      `);
	    case "Mars":
	      return (`
	        <h1>Mars</h1>
	        <p>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, after Mercury. Named after the Roman god of war, it is often referred to as the "Red Planet" because the iron oxide prevalent on its surface gives it a reddish appearance. Mars is a terrestrial planet with a thin atmosphere, having surface features reminiscent both of the impact craters of the Moon and the valleys, deserts, and polar ice caps of Earth.</p>
	
	        <p>The rotational period and seasonal cycles of Mars are likewise similar to those of Earth, as is the tilt that produces the seasons. Mars is the site of Olympus Mons, the largest volcano and second-highest known mountain in the Solar System, and of Valles Marineris, one of the largest canyons in the Solar System. The smooth Borealis basin in the northern hemisphere covers 40% of the planet and may be a giant impact feature. Mars has two moons, Phobos and Deimos, which are small and irregularly shaped. These may be captured asteroids, similar to 5261 Eureka, a Mars trojan.</p>
	
	        <p>There are ongoing investigations assessing the past habitability potential of Mars, as well as the possibility of extant life. Future astrobiology missions are planned, including the Mars 2020 and ExoMars rovers. Liquid water cannot exist on the surface of Mars due to low atmospheric pressure, which is about  6⁄1000 that of the Earth's, except at the lowest elevations for short periods. The two polar ice caps appear to be made largely of water. The volume of water ice in the south polar ice cap, if melted, would be sufficient to cover the entire planetary surface to a depth of 11 meters (36 ft). On November 22, 2016, NASA reported finding a large amount of underground ice in the Utopia Planitia region of Mars. The volume of water detected has been estimated to be equivalent to the volume of water in Lake Superior.</p>
	
	        <p>Mars can easily be seen from Earth with the naked eye, as can its reddish coloring. Its apparent magnitude reaches −2.91, which is surpassed only by Jupiter, Venus, the Moon, and the Sun. Optical ground-based telescopes are typically limited to resolving features about 300 kilometers (190 mi) across when Earth and Mars are closest because of Earth's atmosphere.</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Mars">Read more on Wikipedia</a></p>
	      `);
	    case "Jupiter":
	      return (`
	        <h1>Jupiter</h1>
	        <p>Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a giant planet with a mass one-thousandth that of the Sun, but two and a half times that of all the other planets in the Solar System combined. Jupiter is a gas giant, along with Saturn, with the other two giant planets, Uranus and Neptune, being ice giants. Jupiter was known to astronomers of ancient times. The Romans named it after their god Jupiter. When viewed from Earth, Jupiter can reach an apparent magnitude of −2.94, bright enough for its reflected light to cast shadows, and making it on average the third-brightest object in the night sky after the Moon and Venus.</p>
	
	        <p>Jupiter is primarily composed of hydrogen with a quarter of its mass being helium, though helium comprises only about a tenth of the number of molecules. It may also have a rocky core of heavier elements, but like the other giant planets, Jupiter lacks a well-defined solid surface. Because of its rapid rotation, the planet's shape is that of an oblate spheroid (it has a slight but noticeable bulge around the equator). The outer atmosphere is visibly segregated into several bands at different latitudes, resulting in turbulence and storms along their interacting boundaries. A prominent result is the Great Red Spot, a giant storm that is known to have existed since at least the 17th century when it was first seen by telescope. Surrounding Jupiter is a faint planetary ring system and a powerful magnetosphere. Jupiter has at least 67 moons, including the four large Galilean moons discovered by Galileo Galilei in 1610. Ganymede, the largest of these, has a diameter greater than that of the planet Mercury.</p>
	
	        <p>Jupiter has been explored on several occasions by robotic spacecraft, most notably during the early Pioneer and Voyager flyby missions and later by the Galileo orbiter. In late February 2007, Jupiter was visited by the New Horizons probe, which used Jupiter's gravity to increase its speed and bend its trajectory en route to Pluto. The latest probe to visit the planet is Juno, which entered into orbit around Jupiter on July 4, 2016. Future targets for exploration in the Jupiter system include the probable ice-covered liquid ocean of its moon Europa.</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Jupiter">Read more on Wikipedia</a></p>
	      `);
	    case "Saturn":
	      return (`
	        <h1>Saturn</h1>
	        <p>Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth. Although it has only one-eighth the average density of Earth, with its larger volume Saturn is just over 95 times more massive. Saturn is named after the Roman god of agriculture; its astronomical symbol (♄) represents the god's sickle.</p>
	
	        <p>Saturn's interior is probably composed of a core of iron–nickel and rock (silicon and oxygen compounds). This core is surrounded by a deep layer of metallic hydrogen, an intermediate layer of liquid hydrogen and liquid helium, and finally outside the Frenkel line a gaseous outer layer. Saturn has a pale yellow hue due to ammonia crystals in its upper atmosphere. Electrical current within the metallic hydrogen layer is thought to give rise to Saturn's planetary magnetic field, which is weaker than Earth's, but has a magnetic moment 580 times that of Earth due to Saturn's larger size. Saturn's magnetic field strength is around one-twentieth of Jupiter's. The outer atmosphere is generally bland and lacking in contrast, although long-lived features can appear. Wind speeds on Saturn can reach 1,800 km/h (500 m/s), higher than on Jupiter, but not as high as those on Neptune.</p>
	
	        <p>Saturn has a prominent ring system that consists of nine continuous main rings and three discontinuous arcs and that is composed mostly of ice particles with a smaller amount of rocky debris and dust. Sixty-two moons are known to orbit Saturn, of which fifty-three are officially named. This does not include the hundreds of moonlets comprising the rings. Titan, Saturn's largest moon, and the second-largest in the Solar System, is larger than the planet Mercury, although less massive, and is the only moon in the Solar System to have a substantial atmosphere.</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Saturn">Read more on Wikipedia</a></p>
	      `);
	    case "Uranus":
	      return (`
	        <h1>Uranus</h1>
	        <p>Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is similar in composition to Neptune, and both have different bulk chemical composition from that of the larger gas giants Jupiter and Saturn. For this reason, scientists often classify Uranus and Neptune as "ice giants" to distinguish them from the gas giants. Uranus's atmosphere is similar to Jupiter's and Saturn's in its primary composition of hydrogen and helium, but it contains more "ices" such as water, ammonia, and methane, along with traces of other hydrocarbons. It is the coldest planetary atmosphere in the Solar System, with a minimum temperature of 49 K (−224.2 °C), and has a complex, layered cloud structure with water thought to make up the lowest clouds and methane the uppermost layer of clouds. The interior of Uranus is mainly composed of ices and rock.</p>
	
	        <p>Uranus is the only planet whose name is derived from a figure from Greek mythology, from the Latinised version of the Greek god of the sky Ouranos. Like the other giant planets, Uranus has a ring system, a magnetosphere, and numerous moons. The Uranian system has a unique configuration among those of the planets because its axis of rotation is tilted sideways, nearly into the plane of its solar orbit. Its north and south poles, therefore, lie where most other planets have their equators. In 1986, images from Voyager 2 showed Uranus as an almost featureless planet in visible light, without the cloud bands or storms associated with the other giant planets. Observations from Earth have shown seasonal change and increased weather activity as Uranus approached its equinox in 2007. Wind speeds can reach 250 metres per second (900 km/h, 560 mph).</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Uranus">Read more on Wikipedia</a></p>
	      `);
	    case "Neptune":
	      return (`
	        <h1>Neptune</h1>
	        <p>Neptune is the eighth and farthest known planet from the Sun in the Solar System. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. Neptune is 17 times the mass of Earth and is slightly more massive than its near-twin Uranus, which is 15 times the mass of Earth and slightly larger than Neptune. Neptune orbits the Sun once every 164.8 years at an average distance of 30.1 astronomical units (4.50×109 km). It is named after the Roman god of the sea and has the astronomical symbol ♆, a stylised version of the god Neptune's trident.</p>
	
	        <p>Neptune is not visible to the unaided eye and is the only planet in the Solar System found by mathematical prediction rather than by empirical observation. Unexpected changes in the orbit of Uranus led Alexis Bouvard to deduce that its orbit was subject to gravitational perturbation by an unknown planet. Neptune was subsequently observed with a telescope on 23 September 1846 by Johann Galle within a degree of the position predicted by Urbain Le Verrier. Its largest moon, Triton, was discovered shortly thereafter, though none of the planet's remaining known 14 moons were located telescopically until the 20th century. The planet's distance from Earth gives it a very small apparent size, making it challenging to study with Earth-based telescopes. Neptune was visited by Voyager 2, when it flew by the planet on 25 August 1989. The advent of the Hubble Space Telescope and large ground-based telescopes with adaptive optics has recently allowed for additional detailed observations from afar.</p>
	
	        <p>Neptune's composition is similar to that of Uranus and unlike those of the larger gas giants, Jupiter and Saturn. Like Jupiter's and Saturn's, Neptune's atmosphere is composed primarily of hydrogen and helium, along with traces of hydrocarbons and possibly nitrogen, but contains a higher proportion of "ices" such as water, ammonia, and methane. However, its interior, like that of Uranus, is primarily composed of ices and rock, which is why Uranus and Neptune are normally considered "ice giants" to emphasise this distinction. Traces of methane in the outermost regions in part account for the planet's blue appearance.</p>
	
	        <p>In contrast to the hazy, relatively featureless atmosphere of Uranus, Neptune's atmosphere has active and visible weather patterns. For example, at the time of the Voyager 2 flyby in 1989, the planet's southern hemisphere had a Great Dark Spot comparable to the Great Red Spot on Jupiter. These weather patterns are driven by the strongest sustained winds of any planet in the Solar System, with recorded wind speeds as high as 2,100 kilometres per hour (580 m/s; 1,300 mph). Because of its great distance from the Sun, Neptune's outer atmosphere is one of the coldest places in the Solar System, with temperatures at its cloud tops approaching 55 K (−218 °C). Temperatures at the planet's centre are approximately 5,400 K (5,100 °C). Neptune has a faint and fragmented ring system (labelled "arcs"), which was first detected during the 1960s and confirmed by Voyager 2.</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Neptune">Read more on Wikipedia</a></p>
	      `);
	    case "Pluto":
	      return (`
	        <h1>Pluto</h1>
	        <p>Pluto (minor-planet designation: 134340 Pluto) is a dwarf planet in the Kuiper belt, a ring of bodies beyond Neptune. It was the first Kuiper belt object to be discovered.</p>
	
	        <p>Pluto was discovered by Clyde Tombaugh in 1930 and was originally considered to be the ninth planet from the Sun. After 1992, its planethood was questioned following the discovery of several objects of similar size in the Kuiper belt. In 2005, Eris, which is 27% more massive than Pluto, was discovered. This led the International Astronomical Union (IAU) to define the term "planet" formally. That definition excluded Pluto and reclassified it as a dwarf planet.</p>
	
	        <p>Pluto is the largest and second-most-massive known dwarf planet in the Solar System and the ninth-largest and tenth-most-massive known object directly orbiting the Sun. It is the largest known trans-Neptunian object by volume but is less massive than Eris, a dwarf planet in the scattered disc. Like other Kuiper belt objects, Pluto is primarily made of ice and rock and is relatively small—about one-sixth the mass of the Moon and one-third its volume. It has a moderately eccentric and inclined orbit during which it ranges from 30 to 49 astronomical units or AU (4.4–7.4 billion km) from the Sun. This means that Pluto periodically comes closer to the Sun than Neptune, but a stable orbital resonance with Neptune prevents them from colliding. Light from the Sun takes about 5.5 hours to reach Pluto at its average distance (39.5 AU).</p>
	
	        <p>Pluto has five known moons: Charon (the largest, with a diameter just over half that of Pluto), Styx, Nix, Kerberos, and Hydra. Pluto and Charon are sometimes considered a binary system because the barycenter of their orbits does not lie within either body. The IAU has not formalized a definition for binary dwarf planets, and Charon is officially classified as a moon of Pluto.</p>
	
	        <p>In September 2016, astronomers announced that the reddish-brown cap of the north pole of Charon is composed of tholins, organic macromolecules that may be ingredients for the emergence of life, and produced from methane, nitrogen and related gases released from the atmosphere of Pluto and transferred over about 19,000 km (12,000 mi) distance to the orbiting moon.</p>
	
	        <p>On July 14, 2015, the New Horizons spacecraft became the first spacecraft to fly by Pluto. During its brief flyby, New Horizons made detailed measurements and observations of Pluto and its moons. On October 25, 2016, at 05:48 pm ET, the last bit of data (of a total of 50 billion bits of data; or 6.25 gigabytes) was received from New Horizons from its close encounter with Pluto on July 14, 2015.</p>
	
	        <p class="wikilink"><a href="https://en.wikipedia.org/wiki/Pluto">Read more on Wikipedia</a></p>
	      `);
	    default:
	      return (``);
	  }
	}
	
	
	
	module.exports = {
	  getDetails: getDetails,
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map