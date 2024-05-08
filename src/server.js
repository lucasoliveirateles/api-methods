import env from 'dotenv';
import express from 'express';
import routes from './routes/index.js';

env.config();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
