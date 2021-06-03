const { v4: uuidv4 } = require('uuid');

module.exports = {
  name: 'auth',
  events: {
    'auth.create'() {
      console.log('auth created')
    }
  } 
}