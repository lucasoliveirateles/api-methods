import { Router } from 'express';

const routes = new Router();

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

routes.get('/users', (request, response) => {
  return response.json(users);
});

export default routes;
