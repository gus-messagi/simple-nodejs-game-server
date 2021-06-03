const { v4: uuidv4 } = require('uuid');

module.exports = {
  name: 'user',
  events: {
    'user.connected'() {
      return { connectionId: uuidv4() };
    }
  } 
}