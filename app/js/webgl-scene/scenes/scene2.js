const THREE = require('three')

let spheres = []
let active = false

const vertShader = `
  varying vec3 vPos;

  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`
const fragShader = `
  uniform float time;
  varying vec3 vPos;
  void main() {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    color.r = sin(sin(vPos.x * 15.0) * 0.5 + cos(vPos.y * 10.0) + time / 1000.0);
    color.r = sin(sin(vPos.y * 7.5) * 0.5 + cos(vPos.x * 5.0) + time / 1000.0);
    color.b = cos(vPos.x * vPos.y) * 0.008 + sin(time / 1000.0) * 0.5;
    gl_FragColor = color;
  }
`

const play = () => {
  active = true
}

const stop = () => {
  active = false
}

const init = (scene) => {
  let pGeometry = new THREE.SphereGeometry(1, 20)
  let pMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { type: 'f', value: 0.0 }
    },
    vertexShader: vertShader,
    fragmentShader: fragShader
  })
  for (let i = 0; i < 72; i += 1) {
    let p = new THREE.Mesh(pGeometry, pMaterial)
    scene.add(p)
    spheres.push(p)
  }
}

const updateFrame = (positions, ts) => {
    if (active === true) {
      spheres.forEach((p, i) => {
        if (positions[i]) {
          p.material.uniforms.time.value = ts
          p.position.x = positions[i][0]  * 0.575 + 144.5 
          p.position.y = -positions[i][1] * 0.575 - 105 - p.position.y * 0.1
          p.position.z = 0.2  
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