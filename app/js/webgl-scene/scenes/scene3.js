const THREE = require('three')

const eyeGeometry = new THREE.PlaneGeometry(10, 10)
const eyeMaterial = new THREE.MeshBasicMaterial({ transparent: true })
const eyeMesh     = new THREE.Mesh(eyeGeometry, eyeMaterial)

const moustacheGeometry = new THREE.PlaneGeometry(30, 15)
const moustacheMaterial = new THREE.MeshBasicMaterial({ transparent: true })
const moustacheMesh     = new THREE.Mesh(moustacheGeometry, moustacheMaterial)

const pipeGeometry = new THREE.PlaneGeometry(30, 15)
const pipeMaterial = new THREE.MeshBasicMaterial({ transparent: true })
const pipeMesh     = new THREE.Mesh(pipeGeometry, pipeMaterial)

let active = false

const play = () => {
  active = true
}

const stop = () => {
  active = false
}

const init = (scene) => {
  let textureLoaderEye = new THREE.TextureLoader()
  textureLoaderEye.load('/assets/monocle.png', (eyeTex) => {
      eyeMesh.material.map = eyeTex
  })
  
  let textureLoaderMoustache = new THREE.TextureLoader()
  textureLoaderMoustache.load('/assets/moustache.png', (moustacheTex) => {
    moustacheMesh.material.map = moustacheTex
  })

  let textureLoaderPipe = new THREE.TextureLoader()
  textureLoaderPipe.load('/assets/pipe.png', (pipeTex) => {
    pipeMesh.material.map = pipeTex
  })
  
  eyeMesh.position.set(200, 0, 1)
  scene.add(eyeMesh)
  moustacheMesh.position.set(200, 0, 1)
  scene.add(moustacheMesh)
  pipeMesh.position.set(200, 0, 0.9)
  scene.add(pipeMesh)
}

const updateFrame = (positions) => {
  if (active === true) {
    if (positions[62]) {
      if (eyeMesh.material.map) eyeMesh.material.map.needsUpdate = true
      if (moustacheMesh.material.map) moustacheMesh.material.map.needsUpdate = true
      if (pipeMesh.material.map) pipeMesh.material.map.needsUpdate = true

      eyeMesh.position.x =  positions[32][0] + 300
      eyeMesh.position.y = -positions[32][1] - 10
      moustacheMesh.position.x =  positions[37][0] + 300
      moustacheMesh.position.y = -positions[37][1] - 10
      
      pipeMesh.position.x =  positions[47][0] + 300 - 15
      pipeMesh.position.y = -positions[47][1] - 10  - 5
    }
  }
}

export default {
  play,
  stop,
  init,
  updateFrame
}