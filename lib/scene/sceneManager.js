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
