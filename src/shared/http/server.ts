import env from 'dotenv';
import express from 'express';
import cors from 'cors';
env.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`port: ${PORT}`);
});
