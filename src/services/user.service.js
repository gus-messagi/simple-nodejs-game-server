module.exports = {
  name: 'user',
  events: {
    'user.connected'(ctx) {
      console.log(ctx, 'user created');
    }
  } 
}