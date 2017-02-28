const THREE = require('three')
import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'

const postShader = {
  uniforms: {
    texture: { type: 't', value: null }
  },
  vertexShader: `
    varying vec2 vUv;

    varying vec3 vPos;

    void main() {
      vUv = uv;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform sampler2D texture;

    varying vec2 vUv;
    varying vec3 vPos;

    void main() {
      vec2 lookUp = vUv;
      lookUp.x += sin(vPos.y + time / 1000.0) * 0.25;
      vec4 color = texture2D(texture, lookUp);
      gl_FragColor = color;
    }
  `
}

export default class ComposerFX {
    constructor (width, height) {
        this.scene = new THREE.Scene()
        this.texture = new THREE.WebGLRenderTarget(width / 3, height / 3, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter})
        
        this.composer      = null
        this.originalScene = null
        this.renderer      = null
        this.copyPass      = null
    }
    init (camera, originalScene, renderer) {
        this.composer = new EffectComposer(renderer)
        this.camera = camera
        this.originalScene = originalScene
        this.renderer = renderer

        this.composer.addPass(new RenderPass(this.scene, camera))
        // Add shaders! Celebrate! 
        // const someShaderPass = new ShaderPass(SomeShader) 
        // this.composer.addPass(someShaderPass) 
        // And draw to the screen 
        this.copyPass = new ShaderPass(postShader)
        let { texture } = this.texture
        this.copyPass.uniforms.texture.value = texture
        this.copyPass.uniforms.time = { type: 'f', value: 0 }  
        this.copyPass.renderToScreen = true
        this.composer.addPass(this.copyPass)

        return this
    }
    addToScene (mesh) {
        this.scene.add(mesh)
    }
    updateFrame (ts) {
        
        this.composer.render(this.originalScene, this.camera)
        this.copyPass.uniforms['time'].value = ts
    }
}