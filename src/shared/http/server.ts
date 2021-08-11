import 'reflect-metadata';
import 'dotenv/config';
import server from './app';

server.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server: ${process.env.APP_API_URL}`);
});
