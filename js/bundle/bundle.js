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
	
	SceneManager.initScene();
	
	const sun = new StellarObject(
	  695.7,
	  "./textures/sun/sun_diffuse.jpg",
	  SceneManager.scene,
	  "Sun"
	)
	sun.obj.position.x = 1; // Hack to prevent issue with controls; Orbitcontrols fail when position is (0,0,0)
	
	SceneManager.planets.push(sun);
	
	const mercury = new StellarObject(
	  2.4397,
	  "./textures/mercury/mercury_diffuse.jpg",
	  sun.obj,
	  "Mercury",
	  0.01
	)
	mercury.addOrbit(0.3871, 0.20563, 3.38, 0.3075, sun, 0x616569);
	mercury.updatePosition(0);
	
	SceneManager.planets.push(mercury);
	
	const venus = new StellarObject(
	  6.052,
	  "./textures/venus/venus_diffuse.jpg",
	  sun.obj,
	  "Venus",
	  2.64
	)
	
	venus.addOrbit(0.7233, 0.0067, 3.86, 0.7184, sun, 0x8f8d77);
	venus.updatePosition(0);
	
	SceneManager.planets.push(venus);
	
	
	const earth = new StellarObject(
	  6.371,
	  "./textures/earth/earth_diffuse.jpg",
	  sun.obj,
	  "Earth",
	  23.93
	)
	earth.obj.position.x += 1;
	
	earth.addOrbit(1, 0.0167, 7.16, 0.9833, sun, 0x4d65a4);
	earth.updatePosition(0);
	
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
	  25.19
	)
	mars.addOrbit(1.524 , 0.0934, 5.65, 1.3814, sun, 0x79260f);
	mars.updatePosition(0);
	
	SceneManager.planets.push(mars);
	
	const jupiter = new StellarObject(
	  69.911,
	  "./textures/jupiter/jupiter_diffuse.jpg",
	  sun.obj,
	  "Jupiter",
	  3.12
	)
	jupiter.addOrbit(5.2026, 0.048498, 6.09, 4.95029, sun, 0xd4b48d);
	jupiter.updatePosition(0);
	
	SceneManager.planets.push(jupiter);
	
	const saturn = new StellarObject(
	  58.262,
	  "./textures/saturn/saturn_diffuse.jpg",
	  sun.obj,
	  "Saturn",
	  26.73
	)
	
	saturn.addRing(
	  (58.262 + 6.630),
	  (58.262 + 120.7),
	  "./textures/saturn/saturn_ring_diffuse.png"
	);
	
	saturn.ring.rotation.x = -45;
	saturn.addOrbit(9.5549, 0.05555, 5.51, 9.024, sun, 0xceaf58);
	saturn.updatePosition(0);
	
	SceneManager.planets.push(saturn);
	
	const uranus = new StellarObject(
	  25.362,
	  "./textures/uranus/uranus_diffuse.jpg",
	  sun.obj,
	  "Uranus",
	  82.23
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
	SceneManager.planets.push(uranus);
	
	const neptune = new StellarObject(
	  24.622,
	  "./textures/neptune/neptune_diffuse.jpg",
	  sun.obj,
	  "Neptune",
	  28.33
	)
	
	neptune.addOrbit(30.1104, 0.0094, 6.34, 29.81, sun, 0x3448ff);
	neptune.updatePosition(0);
	SceneManager.planets.push(neptune);
	
	const pluto = new StellarObject(
	  1.187,
	  "./textures/pluto/pluto_diffuse.jpg",
	  sun.obj,
	  "Pluto",
	  60.41
	)
	pluto.addOrbit(39.48, 0.2488, 17.16, 29.659, sun, 0xc29a6d);
	pluto.updatePosition(0);
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
	
	
	SceneManager.controls.target = sun.obj.position;
	SceneManager.controls.minDistance = 50;
	
	SceneManager.controls.maxDistance = MathHelper.auToUnits(50);
	window.earth = earth;
	window.sceneManager = SceneManager;
	
	window.inputManager = InputManager;
	
	SceneManager.camera.position.x = -309000;
	SceneManager.camera.position.y = 441000;
	SceneManager.camera.position.z = 236000;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const MathHelper = __webpack_require__ (2);
	const SimObject = __webpack_require__ (3);
	
	const ORBIT_POINTS = 500;
	
	let hideLabel = false;
	
	class StellarObject extends SimObject {
	  constructor (size, tex_file, parent, name, axialTilt) {
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
	    this.addBody(size, tex_file, axialTilt);
	    this.addLabel(this.name);
	  }
	
	  addBody (size, tex_file, axialTilt) {
	    let geometry = new THREE.SphereGeometry(size, 64, 64);
	    let material = new THREE.MeshLambertMaterial({
	      map: new THREE.TextureLoader().load(tex_file)
	    });
	
	    if (axialTilt) {
	      geometry.rotateX(MathHelper.degToRad(axialTilt));
	    }
	
	    let body = new THREE.Mesh(
	      geometry,
	      material
	    );
	
	    this.obj.add(body); // Body object will be added as child object to allow independent tilt/rotation from parent object (this.obj)
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
	    SceneManager.initSimObject(this);
	    this.obj = new THREE.Object3D();
	    this.sceneManager = SceneManager;
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
	const camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 10, 1000000000 );
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	var frustum = new THREE.Frustum();
	var cameraViewProjectionMatrix = new THREE.Matrix4();
	
	let planets = [];
	let simObjects = [];
	let rootObject = null;
	
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	const initScene = function () {
	  // Set size to fullscreen
	  renderer.setSize( window.innerWidth, window.innerHeight );
	
	  // append renderer to document
	  document.body.appendChild( renderer.domElement );
	
	  // Create an event listener that resizes the renderer with the browser window.
	  window.addEventListener('resize', function() {
	    var WIDTH = window.innerWidth,
	        HEIGHT = window.innerHeight;
	    renderer.setSize(WIDTH, HEIGHT);
	    camera.aspect = WIDTH / HEIGHT;
	    camera.updateProjectionMatrix();
	  });
	
	  rootObject = new THREE.Object3D();
	  rootObject.position.x = 1;
	
	  controls.target = rootObject.position;
	
	  // Start simulation and render loop
	  render();
	}
	
	const render = function () {
	  time = clock.getElapsedTime();
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
	  rootObject: rootObject
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MathHelper = __webpack_require__ (2);
	const SimObject = __webpack_require__ (3);
	
	const SKYSPHERE_SIZE_AU = 60;
	
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
	
	let targetedObject = null;
	
	const receivePlanetTarget = function (target) {
	  for (let i = 0; i < SceneManager.planets.length; i++) {
	    if (SceneManager.planets[i].name == target) {
	
	      targetObject(SceneManager.planets[i]);
	      break;
	    }
	  }
	}
	
	const targetObject = function (target) {
	  if (target === targetedObject) {
	    return;
	  }
	
	  resetControls();
	  targetedObject = target;
	
	  target.hideLabel = true;
	  target.toggleOrbit(false);
	
	  let newCamPos = targetedObject.obj.position.clone();
	  let tgtSize = targetedObject.size;
	
	  let distance = Math.max(20, target.size * 1.5);
	  SceneManager.controls.minDistance = distance;
	  SceneManager.controls.maxDistance = distance * 5;
	
	  SceneManager.camera.position.set(newCamPos.x + distance, newCamPos.y + distance, newCamPos.z + distance);
	
	  SceneManager.controls.target = targetedObject.obj.position;
	}
	
	
	const resetControls = function () {
	  if (targetedObject) {
	    targetedObject.hideLabel = false;
	    targetedObject.toggleOrbit(true);
	  }
	  targetedObject = null;
	
	  SceneManager.controls.target = SceneManager.rootObject;
	  SceneManager.controls.minDistance = 50;
	  SceneManager.controls.maxDistance = MathHelper.auToUnits(50);
	
	  SceneManager.camera.position.x = -309000;
	  SceneManager.camera.position.y = 441000;
	  SceneManager.camera.position.z = 236000;
	}
	
	module.exports = {
	  receivePlanetTarget: receivePlanetTarget,
	  resetControls: resetControls
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map