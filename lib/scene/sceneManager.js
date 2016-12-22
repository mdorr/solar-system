// Set up references
const scene = new THREE.Scene();
const clock = new THREE.Clock();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 10, 1000000000000 );
const renderer = new THREE.WebGLRenderer({ antialias: true });

let simObjects = [];
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
};