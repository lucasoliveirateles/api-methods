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

routes.post('/users', (request, response) => {
  const newUser = request.body;
  
  users.push(newUser);
  
  response.status(201).send('User created successfully');
});

export default routes;
