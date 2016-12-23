const SceneManager = require ('./sceneManager.js');

const receivePlanetTarget = function (target) {
  for (let i = 0; i < SceneManager.planets.length; i++) {
    if (SceneManager.planets[i].name == target) {
      SceneManager.controls.target = SceneManager.planets[i].obj.position;
      console.log("Updating target");
      break;
    }
  }
}

module.exports = {
  receivePlanetTarget: receivePlanetTarget,
}
