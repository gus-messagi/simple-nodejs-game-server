import { Router } from 'express';

const route = Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.post('/', (req, res) => {
    res.status(201).json({ message: 'User created' });
  });
};
