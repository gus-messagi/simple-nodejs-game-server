const { Router } = require('express');
const auth = require('./auth');

const route = Router();

auth(route);

module.exports = route;
