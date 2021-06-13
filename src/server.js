import { broker, server } from './setup';

broker.start();
server.listen(3333, () => 'Server running at port 3333');
