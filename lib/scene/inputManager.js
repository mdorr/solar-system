const SceneManager = require ('./sceneManager.js');
const MathHelper = require ('./../helpers/mathHelper.js');

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
