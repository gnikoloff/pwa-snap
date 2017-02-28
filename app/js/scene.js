import React from 'react'
const THREE = require('three')

import ComposerFX from './webgl-scene/composer-postprocessing'
import VideoTexture from './webgl-scene/videoTexture'

import Scene1 from './webgl-scene/scenes/Scene1'
import Scene2 from './webgl-scene/scenes/Scene2'
import Scene3 from './webgl-scene/scenes/Scene3'
import Scene4 from './webgl-scene/scenes/Scene4'

export default class Scene extends React.Component {
    constructor () {
        super()
        
        this.facePositions = []

        this.width = window.innerWidth
        this.height = window.innerHeight
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer()
        this.scenesGroup = new THREE.Group()
        this.composer = new ComposerFX(this.width, this.height).init(this.camera, this.scene, this.renderer)
        this.audio = document.querySelector('#audio-switch')

        this.videoMesh = null

        this.setScene()

        this.getTexture = this.getTexture.bind(this)
        this.updateFacePoisitions = this.updateFacePoisitions.bind(this)
    }

    componentDidMount () {
        this.el.appendChild(this.renderer.domElement)
        this.makeScenes()
        this.updateFrame()
        Scene1.play()
    }

    componentWillReceiveProps (state) {
        this.audio.play()

        let { activeSceneNum: num } = state
        if (num === 0) {
            Scene1.play()
            Scene2.stop()
            Scene3.stop()
            Scene4.stop()
        } else if (num === 1) {
            Scene1.stop()
            Scene2.play()
            Scene3.stop()
            Scene4.stop()
        } else if (num === 2) {
            Scene1.stop()
            Scene2.stop()
            Scene3.play()
            Scene4.stop()
        } else if (num === 3) {
            Scene1.stop()
            Scene2.stop()
            Scene3.stop()
            Scene4.play()
        }
    }

    render () {
        return (
            <section
                ref={(el) => { this.el = el }} 
                className="webgl-scene">
                <VideoTexture
                    ref={el => this.child = el} 
                    getTexture={this.getTexture}
                    updateFacePositions={this.updateFacePoisitions}/>
            </section>
        )
    }

    setScene () {
        this.renderer.setSize(this.width, this.height)
        this.renderer.setClearColor(0x111111)
        
        this.camera.position.set(0, 0, 85)
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))

        let geometry = new THREE.PlaneBufferGeometry(150, 75)
        let material = new THREE.MeshBasicMaterial({})
        this.videoMesh = new THREE.Mesh(geometry, material)
        this.videoMesh.position.z += 0.5
        this.videoMesh.position.set(0, 0, 0)
        this.composer.addToScene(this.videoMesh)
   
    }

    makeScenes () {
        let { scenes } = this.props.scenes
        Scene1.init(this.scenesGroup, this.videoMesh.material.map)
        Scene2.init(this.scenesGroup)
        Scene3.init(this.scenesGroup)
        Scene4.init(this.scenesGroup)
        this.scenesGroup.position.set(0, 150, 0)
        this.composer.addToScene(this.scenesGroup)
    }

    updateFrame (ts) {
        window.requestAnimationFrame(this.updateFrame.bind(this))
        this.composer.updateFrame(ts)
        this.child.updateFrame()
        //this.camera.position.z += 0.01
        this.scenesGroup.position.x += ((this.props.activeSceneNum * -200) - this.scenesGroup.position.x) * 0.2
        
        this.videoMesh.material.map.needsUpdate = true
        if (this.facePositions) {
            Scene1.updateFrame(this.facePositions)
            Scene2.updateFrame(this.facePositions)
            Scene3.updateFrame(this.facePositions)
            Scene4.updateFrame(this.facePositions)
            // meshes.forEach((m, i) => {
            //     if (this.state.facePositions[i][0]) {
            //         m.position.x = this.state.facePositions[i][0] / 2
            //         m.position.y = -this.state.facePositions[i][1] / 2
            //     }
            // })
        }
    }

    getTexture (texture) {
        this.videoMesh.material.map = texture
        this.videoMesh.material.map.needsUpdate = true
    }

    updateFacePoisitions (positions) {
        this.facePositions = positions
    }

}