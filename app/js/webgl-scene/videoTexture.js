import React from 'react'
const THREE = require('three')
import VideoElement from './videoElement'

export default class VideoTexture extends React.Component {
    constructor () {
        super()

        this.width = 512
        this.height = 256
        this.canvas = document.createElement('canvas')
        this.canvas.style.position = 'fixed'
        this.canvas.style.bottom = '24px'
        this.canvas.style.right = '24px'
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.width
        this.canvas.height = this.height

    }

    componentDidMount () {
        //this.el.appendChild(this.canvas)
        this.props.getTexture(new THREE.Texture(this.canvas))
        document.querySelector('#load-msg').style.transform = 'translate3d(0, 100%, 0)'
    }

    render () {
        return (
            <div>
                <VideoElement 
                    ref={el => this.videoEl = el}
                    updateFacePositions={this.props.updateFacePositions} />
                <div
                    ref={el => this.el = el} 
                    id="canvas-texture">
                </div>
            </div>
        )
    }

    updateFrame () {
        this.ctx.save()
        this.ctx.drawImage(this.videoEl.el, 0, 0, this.width, this.height)
        this.ctx.restore()
    }
        
}