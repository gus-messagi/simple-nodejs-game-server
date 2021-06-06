const { v4: uuidv4 } = require('uuid');

module.exports = {
  name: 'auth',
  events: {
    'auth.create': function () {
      console.log('auth created');
    },
  },
};
