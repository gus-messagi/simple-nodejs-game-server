import { Router } from 'express';
import auth from './auth';

const route = Router();

auth(route);

module.exports = route;
