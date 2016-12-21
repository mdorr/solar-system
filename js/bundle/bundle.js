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
	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100000 );
	
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
	mercury.obj.position.x = 1000;
	
	const venus = new StellarObject(
	  6.052,
	  "./textures/venus/venus_diffuse.jpg",
	  sun.obj
	)
	venus.obj.position.x = 1250;
	
	const earth = new StellarObject(
	  6.371,
	  "./textures/earth/earth_diffuse.jpg",
	  sun.obj
	)
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
	
	const jupiter = new StellarObject(
	  69.911,
	  "./textures/jupiter/jupiter_diffuse.jpg",
	  sun.obj
	)
	jupiter.obj.position.x = 2500;
	
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
	
	
	
	
	const neptune = new StellarObject(
	  24.622,
	  "./textures/neptune/neptune_diffuse.jpg",
	  sun.obj
	)
	neptune.obj.position.x = 3250;
	
	const pluto = new StellarObject(
	  1.187,
	  "./textures/pluto/pluto_diffuse.jpg",
	  sun.obj
	)
	pluto.obj.position.x = 3500;
	
	
	
	
	var imagePrefix = "./../textures/skybox/";
	var directions  = ["posx", "negx", "posy", "negy", "posz", "negz"];
	var imageSuffix = ".png";
	var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );
	
	var materialArray = [];
	for (var i = 0; i < 6; i++)
	  materialArray.push( new THREE.MeshBasicMaterial({
	    map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
	    side: THREE.BackSide
	  }));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	scene.add( skyBox );
	
	
	
	
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.target = earth.obj.position;
	camera.position = earth.position;
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
	
	
	  earth.obj.rotation.y += delta * 10000;
	
	  renderer.render(scene, camera);
	  controls.update();
	};
	
	render();


/***/ },
/* 1 */
/***/ function(module, exports) {

	class StellarObject {
	  constructor ( size, tex_file, parent ) {
	    this.obj = new THREE.Mesh(
	      new THREE.SphereGeometry(size, 64, 64),
	      new THREE.MeshBasicMaterial({
	        map: new THREE.TextureLoader().load(tex_file)
	      })
	    );
	    parent.add(this.obj);
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map