const express = require('express');
const http = require('http');
const WebSocketServer = require('websocket').server;
const { ServiceBroker } = require('moleculer');
const route = require('./api');

const app = express();
const server = http.createServer(app);
const broker = new ServiceBroker();

const ws = new WebSocketServer({
  httpServer: server,
});

app.use(route);

/** @FIXME
 * TODO: Find a better way to handle this webSocket, seeking to improve code reading
*/
ws.on('request', async (request) => {
  const connection = request.accept(request.origin);

  const [userConnection] = await broker.emit('user.connected');

  connection.send(JSON.stringify(userConnection));

  connection.on('message', async (message) => {
    try {
      /** @DOCUMENTATION
       * * Property data from message
       * {
       *    type: event
       *    data: object
       *    connectionId: string
       * }
       */
      const messageJSON = JSON.parse(message.utf8Data);

      const response = await broker.emit(messageJSON.type);
      console.log(response);
      connection.send(JSON.stringify(response));

      ws.connections.forEach((_connection) => {
        if (_connection !== connection) {
          _connection.send(message.utf8Data);
        }
      });
    } catch (error) {
      console.error(error);
      connection.send(JSON.stringify({ message: 'Error' }));
    }
  });
});

broker.loadServices(`${__dirname}/services`, '**/index.js');

module.exports = { broker, server };
