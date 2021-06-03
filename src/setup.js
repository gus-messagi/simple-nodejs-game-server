const express = require('express');
const http = require('http');
const WebSocketServer = require('websocket').server;
const { ServiceBroker } = require('moleculer');
const route = require('./api');

const app = express();
const server = http.createServer(app);
const broker = new ServiceBroker();

ws = new WebSocketServer({
  httpServer: server,
});

app.use(route);

broker.loadServices(folder = `${__dirname}/services`, fileMask = '**/*');

module.exports = { broker, server, ws };
