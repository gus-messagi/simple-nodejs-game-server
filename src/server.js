const { v4: uuidv4 } = require('uuid');
const { broker, server, ws } = require('./setup');

ws.on('request', async function(request) {
  const connection = request.accept(request.origin);

  broker.emit('user.connected', { connectionId: uuidv4() });

  connection.on('message', function(message) {
    try {
      const messageJSON = JSON.parse(message.utf8Data);
      console.log(messageJSON);
    }
    catch (error) {
      console.error(error);
    }
  });
});

broker.start();
server.listen(3333, () => 'Server running at port 3333');