const SceneManager = require ('./../scene/sceneManager.js');

class SimObject {
  constructor () {
    SceneManager.initSimObject(this);
    this.obj = new THREE.Object3D();
    this.sceneManager = SceneManager;
  };

  // Update is called once per frame
  update (delta) { }
}

module.exports = SimObject;
