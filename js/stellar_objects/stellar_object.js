class StellarObject {
  constructor ( size, tex_file, parent ) {
    this.obj = new THREE.Mesh(
      new THREE.SphereGeometry(size, 64, 64),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(tex_file)
      })
    );
    parent.add(this.obj);
  }

  addRing (innerRadius, outerRadius, tex_file, alpha_map) {
    let ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64)
  
    this.ring = new THREE.Mesh(
      ringGeometry,
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(tex_file),
        alphaMap: new THREE.TextureLoader().load(alpha_map),
        transparent: true
      })
    )
    this.obj.add(this.ring);
  }


}

module.exports = StellarObject;
