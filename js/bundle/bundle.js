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
	const MathHelper = __webpack_require__ (2);
	
	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 10, 1000000000 );
	
	var renderer = new THREE.WebGLRenderer({ antialias: true });
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
	mercury.addOrbit(0.3871, 0.20563, 3.38, 0.3075, sun, 0x616569);
	
	const venus = new StellarObject(
	  6.052,
	  "./textures/venus/venus_diffuse.jpg",
	  sun.obj
	)
	
	venus.addOrbit(0.7233, 0.0067, 3.86, 0.7184, sun, 0x8f8d77);
	
	const earth = new StellarObject(
	  6.371,
	  "./textures/earth/earth_diffuse.jpg",
	  sun.obj
	)
	
	earth.addOrbit(1, 0.0167, 7.16, 0.9833, sun, 0x4d65a4);
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
	
	mars.addOrbit(1.524 , 0.0934, 5.65, 1.3814, sun, 0x79260f);
	
	
	const jupiter = new StellarObject(
	  69.911,
	  "./textures/jupiter/jupiter_diffuse.jpg",
	  sun.obj
	)
	
	jupiter.addOrbit(5.2026, 0.048498, 6.09, 4.95029, sun, 0xd4b48d);
	
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
	
	saturn.addOrbit(9.5549, 0.05555, 5.51, 9.024, sun, 0xceaf58);
	
	
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
	
	uranus.addOrbit(19.2184, 0.04638, 6.48, 18.33, sun, 0xc2edee);
	
	
	
	
	const neptune = new StellarObject(
	  24.622,
	  "./textures/neptune/neptune_diffuse.jpg",
	  sun.obj
	)
	neptune.obj.position.x = 3250;
	
	neptune.addOrbit(30.1104, 0.0094, 6.34, 29.81, sun, 0x3448ff);
	
	const pluto = new StellarObject(
	  1.187,
	  "./textures/pluto/pluto_diffuse.jpg",
	  sun.obj
	)
	pluto.obj.position.x = 3500;
	
	pluto.addOrbit(39.48, 0.2488, 17.16, 29.659, sun, 0xc29a6d);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const MathHelper = __webpack_require__ (2);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map