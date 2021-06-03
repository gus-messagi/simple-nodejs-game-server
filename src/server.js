const { broker, server, ws } = require('./setup');

ws.on('request', async function(request) {
  const connection = request.accept(request.origin);

  const [userConnection] = await broker.emit('user.connected');

  connection.send(JSON.stringify(userConnection));

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