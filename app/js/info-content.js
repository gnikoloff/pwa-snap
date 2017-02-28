import React from 'react'

export default () => {
    return (
        <div className="info-content">
            <h3 className="section-title">Save Image</h3>
            <ul>
                <li><p>Desktop: Right click anywhere on the image and click "Save Image as..."</p></li>
                <li><p>Mobile: Touch and hold anywhere on the image</p></li>
            </ul>
            <h3 className="section-title">PWA Snap</h3>
            <p>
                This is a progressive web app clone of Snapchat, made to work offline. <br/>
                Developed using React for UI, clmtrackr for face recognition and THREE.js for graphics. <br />
                Code is available at <a href="https://github.com/gnikoloff/pwa-snap" target="_blank">Github</a>
            </p>
            <h3 className="section-title">About</h3>
            <p>
                Georgi Nikoloff has developed and designed this website.
                If you are interested in him, please don't hesitate to get in touch.
            </p>
            <ul className="contact-links">
                <li><a target="_blank" href="http://gnikoloff.com">Website</a></li>
                <li><a target="_blank" href="https://twitter.com/georgiNikoloff">Twitter</a></li>
                <li><a target="_blank" href="http://codepen.io/gbnikolov.com">Codepen</a></li>
                <li><a target="_blank" href="mailto:nikoloffgeorgi@gmail.com">Email</a></li>
            </ul>
        </div>
    )
}