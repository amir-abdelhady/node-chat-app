const {generateMessage} = require('./utils/message')

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

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage)
        io.emit('createMessage', generateMessage(message.from, message.text))
        // socket.broadcast.emit('newMessage', {
        //     from: Message.from,
        //     text: Message.text,
        //     createdAt: new Date().getTime
        // })
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
})

app.use(express.static(publicPath))

server.listen(port, () => console.log(`Listening on port: ${port}`))


