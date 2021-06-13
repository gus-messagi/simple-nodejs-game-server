import { v4 as uuidv4 } from 'uuid';

module.exports = {
  name: 'auth',
  events: {
    'auth.create': function () {
      console.log('auth created');
    },
  },
};
