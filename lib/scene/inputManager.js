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
    targetedObject.toggleVisibility(true);
    targetedObject = "";
    targetName = "";
  }
}

const togglePlanets = function (selection, newVisibilityState) {
  for (let i = 0; i < SceneManager.planets.length; i++) {
    if (selection.includes(SceneManager.planets[i].name)) {
      SceneManager.planets[i].toggleVisibility(newVisibilityState);
    }
  }
}

const clearCurrentSelection = function () {
  targetedObject = null;
  targetName = "";

  // Reset all planets to be visible. If a planet is currently
  // selected, it will deactivate it's own orbit in targetPlanet
  for (let i = 0; i < SceneManager.planets.length; i++) {
    SceneManager.planets[i].toggleVisibility(true);
  }
}

const targetArea = function (tName) {
  clearCurrentSelection();
  targetName = tName;
  resetControls();
  updateButtons(targetName);

  switch (tName) {
    case "The Outer Planets":
      SceneManager.camera.position.set(5799000, 4511034, -5155667);
      togglePlanets(["Mercury", "Venus", "Earth", "Mars"], false);
    break;
    case "The Inner Planets":
      SceneManager.camera.position.set(150375, 434724, 241257);
      togglePlanets(["Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"], false);
    break;
  }
}

const targetPlanet = function (target) {
  if (target === targetedObject) {
    return;
  }
  clearCurrentSelection();

  resetControls();

  targetedObject = target;
  targetName = target.name;

  updateButtons(targetName);

  target.toggleVisibility(false);

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
  SceneManager.controls.maxDistance = MathHelper.auToUnits(60);

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
