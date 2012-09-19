var express = require('express')
  , http = require('http')
  , socketio = require("socket.io")
  , eyes = require('eyes')

var app = express()
  , server = http.createServer(app)
  , io = socketio.listen(server)

server.listen(3000)

app.configure(function(){
    app.use(express.methodOverride())
    app.use(express.bodyParser())
    app.use(app.router)
    app.use(express.static(__dirname + '/public'))
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})


var sockets = {};

io.sockets.on('connection', function(client) {
  sockets[client.id] = {};

  // send a message to all users, excluding client
  // this and the next emit gets called right after the client connects
  client.broadcast.emit('new_user', { id: client.id })

  // send a message named 'message' to client, with given data
  client.emit('message', { stuff: 'and then some' })

  // handle a message called 'modify'
  client.on('modify', function(message) {
    console.log(eyes.inspect(message))
  })

  // handle users being disconnected
  client.on('disconnect', function() {
    // if its a multiuser app (not just using websockets for
    // real-time updates), its a good idea to notify everyone
    client.broadcast.emit('remove_user', { id: client.id })
    delete sockets[client.id]
  })
})

