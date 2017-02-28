const THREE = require('three')

const glassesGeometry = new THREE.PlaneGeometry(35, 17.5)
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
  
  
  glassesMesh.position.set(500, 0, 0)
  scene.add(glassesMesh)
}

const updateFrame = (positions) => {
  if (active === true) {
    if (positions[62]) {
      if (glassesMesh.material.map) glassesMesh.material.map.needsUpdate = true
      
      glassesMesh.position.x =  positions[41][0] + 500
      glassesMesh.position.y = -positions[41][1] - 40

      let scaleFactor = (positions[14][0] - positions[1][0]) / 40
      glassesMesh.scale.set(scaleFactor, scaleFactor, 1)
      let angle = positions[20][1] - positions[16][1] 
      glassesMesh.rotation.z = Math.sin(angle * Math.PI / 180)
    }
  }
}

export default {
  play,
  stop,
  init,
  updateFrame
}