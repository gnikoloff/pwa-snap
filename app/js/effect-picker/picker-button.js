import React from 'react'

export default class PickerButton extends React.Component {
    constructor () {
        super()
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
        let { index } = this.props
        this.props.setActiveScene(index)
        this.props.moveIntoPosition(index)
    }
    render () {
        return (
            <div className="picker-button-container">
                <button
                    onClick={this.handleClick} 
                    className="picker-button" ></button>
            </div>
        )
    }
}