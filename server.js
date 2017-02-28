const path = require('path')
const express = require('express')
const app = express()
const compression = require('compression')

const PORT = process.env.PORT || 1101

app.use(compression())
app.use(express.static('public'))

app.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
})