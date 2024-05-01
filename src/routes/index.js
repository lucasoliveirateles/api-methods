import net from 'net';
import { Router } from 'express';

const routes = new Router();

let users = [
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

routes.put('/users/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const data = request.body;
  
  const index = users.findIndex(user => user.id === id);
  
  if (index !== -1) {
    users[index] = { ...users[index], ...data };
    response.status(200).json(users);
  } else {
    response.status(404).json({ message: 'User not found' });
  }
});

routes.delete('/users/:id', (request, response) => {
  const id = parseInt(request.params.id);
  
  users = users.filter(user => user.id !== id);
  
  response.status(204).send();
});

routes.patch('/users/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const updateFields = request.body;

  const index = users.findIndex(user => user.id === id);
  
  if (index !== -1) {
    users[index] = { ...users[index], ...updateFields };
    response.status(200).json(users);
  } else {
    response.status(404).json({ message: 'User not found' });
  }
});

routes.options('/http', (request, response) => {
  response.setHeader('Allow', 'GET, POST, PUT, DELETE', 'PATCH', 'COPY');
  
  response.setHeader('Access-Control-Allow-Origin', '*');

  response.status(204).send();
});

let resource = 'Original content';

routes.copy('/resource', (request, response) => {
  const copiedResource = resource;

  response.status(200).json({ 
    message: `Resource copied successfully: ${copiedResource}`
  });
});

const resourceData = {
  id: 1,
  name: 'Example Resource',
  description: 'This is a sample resource for demonstration purposes.'
};

routes.head('/resource', (request, response) => {
  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': JSON.stringify(resourceData).length
  };

  response.writeHead(200, headers);
  response.end();
});

let resourceProperties = {
  name: 'Sample Resource',
  description: 'This is a sample resource for demonstration purposes.'
};

routes.proppatch('/resource', (request, response) => {
  const { name, description } = request.body;

  if (name) resourceProperties.name = name;
  if (description) resourceProperties.description = description;

  response.status(200).json(resourceProperties);
});

const resourceLocks = new Map();

routes.lock('/resource', (request, response) => {
  const { resource, owner } = request.body;

  if (resourceLocks.has(resource)) {
    response.status(409).json({ message: 'Resource is already locked'});
  } else {
    resourceLocks.set(resource, { owner });

    response.status(200).json({ message: 'Resource locked successfully'});
  }
});

export default routes;
