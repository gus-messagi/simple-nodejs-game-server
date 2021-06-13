import express from 'express';
import http from 'http';
import { server as WebSocketServer } from 'websocket';
import { ServiceBroker } from 'moleculer';
import route from './api';

const app = express();
const server = http.createServer(app);
const broker = new ServiceBroker();

const ws = new WebSocketServer({
  httpServer: server,
});

const players = [];

app.use(route);

/** @FIXME
 * TODO: Find a better way to handle this webSocket, seeking to improve code reading
*/
ws.on('request', async (request) => {
  const connection = request.accept(request.origin);

  const [newPlayerConnection] = await broker.emit('player.connected');

  connection.send(JSON.stringify(newPlayerConnection));

  players.push({
    connection,
    connectionId: newPlayerConnection.connectionId,
    life: 100,
    damage: 10,
  });

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

      const response = await broker.emit(messageJSON.type, messageJSON);

      connection.send(JSON.stringify(response));

      players.forEach((player) => {
        if (player.connection !== connection) {
          player.connection.send(message.utf8Data);
        }
      });
    } catch (error) {
      console.error(error);
      connection.send(JSON.stringify({ message: 'Error' }));
    }
  });
});

broker.loadServices(`${__dirname}/services`, '*/index.js');

export { broker, server };
