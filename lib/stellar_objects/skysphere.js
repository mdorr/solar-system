const MathHelper = require ('./../helpers/mathHelper.js');
const SimObject = require ('./simObject.js');

const SKYSPHERE_SIZE_AU = 70;

class SkySphere extends SimObject {
  constructor (tex_file, parent) {
    super();

    let geometry = new THREE.SphereGeometry(MathHelper.auToUnits(SKYSPHERE_SIZE_AU), 32, 32);

    let uniforms = {
      texture: { type: 't', value: new THREE.TextureLoader().load(tex_file) }
    };

    let material = new THREE.ShaderMaterial( {
      uniforms:       uniforms,
      vertexShader:   document.getElementById('sky-vertex').innerHTML,
      fragmentShader: document.getElementById('sky-fragment').innerHTML
    });

    let skysphere = new THREE.Mesh(geometry, material);

    skysphere.scale.set(-1, 1, 1);
    skysphere.rotation.order = 'XZY';
    skysphere.renderDepth = 1000.0;

    parent.add(skysphere);
  }
}

module.exports = SkySphere;
