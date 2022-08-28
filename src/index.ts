import 'dotenv/config';
import app from './app';

const LISTEN_PORT = process.env.PORT;

app.listen(LISTEN_PORT, () => {
  console.log(`App is listening on port ${LISTEN_PORT}`);
});
