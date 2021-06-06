const { v4: uuidv4 } = require('uuid');

const resolver = require('./resolver');

module.exports = {
  name: 'user',
  events: {
    'user.connected': function () {
      return { connectionId: uuidv4() };
    },
    'user.walked': (ctx) => resolver.walk(ctx),
  },
};
