const THREE = require('three')

const geometry = new THREE.PlaneGeometry(40, 40)
let mesh
let texLoaded = false

let active = false

const play = () => {
  active = true
}

const stop = () => {
  active = false
}

const init = (scene) => {
  let loader = new THREE.TextureLoader()
  loader.load('/assets/PNGPIX-COM-Batman-Mask-PNG-Transparent-Image-1.png', (tex) => {
    const material = new THREE.MeshBasicMaterial({ map: tex, transparent: true })
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0, 1)
    scene.add(mesh)

    texLoaded = true
  })
}

const updateFrame = (positions) => {
  if (active === true) {
    
    if (positions[62] && texLoaded) {
      mesh.position.x = positions[62][0] - 105
      mesh.position.y = -positions[62][1] 
      
      let scaleFactor = (positions[14][0] - positions[1][0]) / 35
      mesh.scale.set(scaleFactor, scaleFactor, 1)
      let angle = positions[20][1] - positions[16][1] 
      mesh.rotation.z = Math.sin(angle * Math.PI / 180)
    }
  }
}

export default {
  play,
  stop,
  init,
  updateFrame
}