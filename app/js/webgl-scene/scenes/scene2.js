const THREE = require('three')

let lines = []

let active = false

const play = () => {
  active = true
}

const stop = () => {
  active = false
}

const init = (scene, texture) => {
  
  let lineMaterial = new THREE.LineBasicMaterial({
    color: 0xFFFF00
  })
  for (let i = 0; i < 72; i += 1) {
    let lineGeometry = new THREE.Geometry()
    lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0))
    lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0))
    let line = new THREE.Line(lineGeometry, lineMaterial)
    line.position.set(0, 0, 1)
    scene.add(line)
    lines.push(line)
  }
}

const updateFrame = (positions) => {
    if (active === true) {
      lines.forEach((l, i) => {
          if (positions[i]) {
            l.geometry.verticesNeedUpdate = true;
            l.geometry.vertices[0].x = positions[i][0] + 100
            l.geometry.vertices[0].y = -positions[i][1]
            if (positions[i + 1]) {
              l.geometry.vertices[1].x = positions[i + 1][0] + 100
              l.geometry.vertices[1].y = -positions[i + 1][1]
            } else {
              l.geometry.vertices[1].x = positions[i - 1][0] + 100
              l.geometry.vertices[1].y = -positions[i - 1][1]
            }
          }
      })
    }
}

export default {
  play,
  stop,
  init,
  updateFrame
}