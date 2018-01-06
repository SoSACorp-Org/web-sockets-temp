const Io = require('socket.io');

let io;
module.exports = {

  init(server) {
    io = new Io(server);
    io.on('connect', function open(client) {
      client.emit('hello', 'client connected');
    });
  },

  get() {
    return io;
  }
};