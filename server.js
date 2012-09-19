var env = process.env ? process.env : 'development'


var express = require('express')
  , socketio = require('socket.io')
  , eyes = require('eyes')
  , _ = require('underscore')


var app = express.createServer(express.logger(), express.bodyParser())
app.use(app.router)
app.use(express.static(__dirname + '/public'))
app.listen(8001)
var io = socketio.listen(app)


var sockets = {};

io.sockets.on('connection', function(socket) {
  sockets[socket.id] = {};

  socket.on('', function(data) {
    
  })

  socket.on('disconnect', function() {
    delete sockets[socket.id]
  })
})

/**
 * Game Loop
 *
 * The game simulation is run on each client as well as on the server. The 
 * server holds the master game loop, and updates the clients semi-frequently. 
 * The client and server should share this code. The client should include 
 * drawing functions. 
 */
setInterval(function() {

}, 50)

