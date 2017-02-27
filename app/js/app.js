import React from 'react'
import { render } from 'react-dom'

import Header from './header'
import Scene from './scene'
import EffectPicker from './effect-picker/picker-container'

import ScenesInfo from '../scenes-info.json'
import Style from '../sass/style.scss'

class App extends React.Component {
    constructor () {
        super()
        this.state = {
            scenes: ScenesInfo,
            activeSceneNum: 0
        }
        this.setActiveScene = this.setActiveScene.bind(this)
    }
    setActiveScene ( activeSceneNum ) {
        this.setState({ activeSceneNum })
    }
    render () {
        return (
            <div>
                <Header />
                <Scene 
                    scenes={this.state.scenes} 
                    activeSceneNum={this.state.activeSceneNum} />
                <EffectPicker 
                    scenes={this.state.scenes}
                    setActiveScene={this.setActiveScene} />
            </div>
        )
    }
}

render(
    <App />,
    document.querySelector('#app-container')
)