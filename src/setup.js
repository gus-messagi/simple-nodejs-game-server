const express = require('express');
const http = require('http');
const WebSocketServer = require('websocket').server;
const { ServiceBroker } = require('moleculer');

const app = express();
const server = http.createServer(app);
const broker = new ServiceBroker();

ws = new WebSocketServer({
  httpServer: server,
});

broker.loadService('./src/services/user.service');

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

module.exports = { broker, server, ws };
