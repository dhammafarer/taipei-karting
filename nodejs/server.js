var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var Redis = require('ioredis')
var redis = new Redis()

server.listen(5000, function () {
  console.log('Listening on Port 5000')
})

redis.subscribe('races-channel')
redis.on('message', function (channel, message) {
  console.log('event received')
  console.log(channel, message)
})

