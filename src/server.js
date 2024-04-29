import express from 'express';
import routes from './routes/index.js';

const port = 3000;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
