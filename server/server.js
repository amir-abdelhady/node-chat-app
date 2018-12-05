const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

io.on('connection', (socket) => {
    console.log('New user is connected')

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
})

app.use(express.static(publicPath))

server.listen(port, () => console.log(`Listening on port: ${port}`))

