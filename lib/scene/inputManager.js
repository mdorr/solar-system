const SceneManager = require ('./sceneManager.js');
const MathHelper = require ('./../helpers/mathHelper.js');
const SoDetails = require ('./../stellar_objects/details/soDetails.js');

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
