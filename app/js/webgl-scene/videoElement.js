import React from 'react'
import getUserMedia from 'get-user-media'
import clm from '../../../node_modules/clmtrackr/clmtrackr'
import pModel from '../../../node_modules/clmtrackr/models/model_pca_10_svm'

export default class VideoElement extends React.Component {

    constructor () {
        super()

        this.state = {
            loaded: false
        }

        this.ctracker = null
    }

    componentDidMount () {
        if (navigator.getUserMedia) {
            getUserMedia({ audio: false, video: true },
            (err, stream) => {
                let video = this.el;
                video.srcObject = stream;
                video.onloadedmetadata = this.onloaded.bind(this)
            });
        } else {
            document.querySelector('#unsupport').style.display = 'none'
        }     
    }
    render () {
        return (
            <video 
                width="200"
                height="200"
                ref={(el) => this.el = el}
                id="webcam"></video>
        )
    }
    
    onloaded (e) {
        let video = this.el
        video.play()
        this.ctracker = new clm.tracker({ searchWindow: 5 })
        this.ctracker.init(pModel)
        this.ctracker.start(video)
        this.setState({ loaded: true })

        setInterval(() => {
            if (this.state.loaded) {
                this.props.updateFacePositions(this.ctracker.getCurrentPosition())
            }        
        }, 1000 / 10)
    }
}