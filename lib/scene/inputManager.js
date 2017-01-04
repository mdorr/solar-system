const SceneManager = require ('./sceneManager.js');
const MathHelper = require ('./../helpers/mathHelper.js');
const SoDetails = require ('./../stellar_objects/details/soDetails.js');

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
  updateButtons(target);
  targetedObject = target;

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

const updateButtons = function (target) {
//  let infolink = document.getElementById('info');
  let title = document.getElementById('title');
//  let helptext = document.getElementById('help');

  if (/*backbutton && infolink && */title/* && helptext*/) {
    if (target) {
      //backbutton.innerHTML = "Back";
      //infolink.innerHTML = "Info";
      title.innerHTML = target.name;
      //helptext.innerHTML = "";
    } else {
      //backbutton.innerHTML = "";
      //infolink.innerHTML = "";
      title.innerHTML = "The Solar System";
      //helptext.innerHTML = "Click and drag to rotate. Click any label for details.";
    }
  }
}

const showDetails = function () {
  let overlay = document.getElementById('overlay');
  let details = document.getElementById('details');

  if (overlay && details) {
    if (targetedObject) {
      overlay.className = "overlay";
      details.className = "details";
      details.innerHTML = SoDetails.getDetails(targetedObject.name);
    }
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
  SceneManager.camera.position.x = -309000;
  SceneManager.camera.position.y = 441000;
  SceneManager.camera.position.z = 236000;
}

module.exports = {
  receivePlanetTarget: receivePlanetTarget,
  resetControls: resetControls,
  showDetails: showDetails,
  hideDetails: hideDetails
}
