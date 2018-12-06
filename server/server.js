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

    // socket.emit('newEmail', {
    //     from: 'eyo@example.com',
    //     text: 'hey what is going on!',
    //     createAt: 123
    // })

    // socket.emit('newMessage', {
    //     from: 'Andrew',
    //     text: 'Where are you?',
    //     createAt: 12345
    // })

    socket.on('createEmail', (newEmail) => console.log('createEmail', newEmail))

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
    })
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage)
        io.emit('createMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
          })
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


