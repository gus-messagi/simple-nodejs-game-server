const { broker, server } = require('./setup');

broker.start();
server.listen(3333, () => 'Server running at port 3333');
