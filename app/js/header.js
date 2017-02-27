import React from 'react'

export default class Header extends React.Component {
    constructor () {
        super()

        this.showDialog = this.showDialog.bind(this)
        this.hideDialog = this.hideDialog.bind(this)
        
        this.dialogEl = null
        this.mouseCount = 0
    }
    showDialog (e) {
        if (e.type === 'mousedown') {
            if (this.mouseCount % 2 === 0) {
                this.dialogEl.className = 'info open'  
                e.target.className = 'info-button open'  
            } else if (this.mouseCount % 2 !== 0) {
                this.hideDialog()
                e.target.className = 'info-button'
            }
            this.mouseCount += 1
        } else {
            this.dialogEl.className = 'info open'
        }
    }
    hideDialog () {
        this.dialogEl.className = 'info'
    }
    render () {
        return (
            <header className="app-header">
                <div className="logotype">PWA Snap</div>
                <div className="info-container">
                    <button
                        className="info-button"
                        onMouseDown={this.showDialog}>
                        Info
                    </button>
                    <div 
                        ref={el => this.dialogEl = el}
                        className="info">
                        <div className="info-background"></div>
                        <div className="info-content">
                            <h3 className="section-title">Save Image    </h3>
                            <h3 className="section-title">PWA Snap</h3>
                            <h3 className="section-title">Info</h3>
                            <h3 className="section-title">About</h3>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}