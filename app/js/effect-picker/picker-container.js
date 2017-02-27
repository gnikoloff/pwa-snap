import React from 'react'

import PickerButton from './picker-button'

export default class EffectPicker extends React.Component {
    constructor () {
        super()
        
        this.moveIntoPosition = this.moveIntoPosition.bind(this)
    }
    moveIntoPosition (index) {
        this.el.style.transform = `translate3d(${-index * 120}px, 0, 0)`
    }
    render () {
        let { scenes } = this.props.scenes
        let items = scenes.map((scene, i) => {
            return <PickerButton 
                key={i} 
                index={i}
                setActiveScene={this.props.setActiveScene}
                moveIntoPosition={this.moveIntoPosition}
                {...scene}  />
        })
        return (
            <section className="effect-picker">
                <div
                    ref={el => this.el = el} 
                    className="pickers-container">
                    {items}
                </div>
            </section>
        )
    }
}