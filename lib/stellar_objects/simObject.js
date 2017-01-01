const SceneManager = require ('./../scene/sceneManager.js');

class SimObject {
  constructor () {
    this.obj = new THREE.Object3D();
    this.sceneManager = SceneManager;
    SceneManager.initSimObject(this);
  };

  // Update is called once per frame
  update (delta) { }
}

module.exports = SimObject;
