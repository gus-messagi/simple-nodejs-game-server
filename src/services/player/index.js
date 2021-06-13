import { v4 as uuidv4 } from 'uuid';

module.exports = {
  name: 'player',
  events: {
    'player.connected': function () {
      return { connectionId: uuidv4() };
    },
  },
};
