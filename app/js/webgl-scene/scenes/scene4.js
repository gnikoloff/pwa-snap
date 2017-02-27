const THREE = require('three')

const glassesGeometry = new THREE.PlaneGeometry(35, 35)
const glassesMaterial = new THREE.MeshBasicMaterial({ transparent: true })
const glassesMesh     = new THREE.Mesh(glassesGeometry, glassesMaterial)

let active = false

const play = () => {
  active = true
}

const stop = () => {
  active = false
}

const init = (scene) => {
  let textureLoaderGlasses = new THREE.TextureLoader()
  textureLoaderGlasses.load('/assets/party-glasses.png', (eyeTex) => {
      glassesMesh.material.map = eyeTex
  })
  
  
  glassesMesh.position.set(500, 0, 1)
  scene.add(glassesMesh)
}

const updateFrame = (positions) => {
  if (active === true) {
    if (positions[62]) {
      if (glassesMesh.material.map) glassesMesh.material.map.needsUpdate = true
      
      glassesMesh.position.x =  positions[32][0] + 500
      glassesMesh.position.y = -positions[32][1] - 10
    }
  }
}

export default {
  play,
  stop,
  init,
  updateFrame
}