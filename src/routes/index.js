import fs from 'fs';
import { Router } from 'express';

const routes = new Router();

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

routes.get('/users', (request, response) => {
  response.json(users);
});

routes.post('/users', (request, response) => {
  const data = request.body;
  
  users.push(data);
  
  response.status(200).json(data);
});

routes.put('/users/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const data = request.body;
  
  const index = users.findIndex(user => user.id === id);
  
  if (index !== -1) {
    users[index] = { ...users[index], ...data };

    response.status(200).json(users);
  } else {
    response.status(404).json({ message: 'user not found' });
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
    response.status(404).json({ message: 'user not found' });
  }
});

routes.options('/http', (request, response) => {
  response.setHeader(
    'Allow', 'GET, POST, PUT, DELETE, PATCH, COPY, HEAD, PROPPATCH, LOCK, UNLOCK, REPORT, PROPFIND, MKCOL, MKACTIVITY, CHECKOUT, MOVE, MERGE, TRACE, NOTIFY' 
  );
  
  response.setHeader('Access-Control-Allow-Origin', '*');

  response.status(204).send();
});

let resource = 'Original content';

routes.copy('/resource', (request, response) => {
  const copiedResource = resource;

  response.status(200).json({ 
    message: `resource copied successfully: ${copiedResource}`
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

routes.propfind('/resource', (request, response) => {
  const { properties } = request.body;

  const requestedProperties = {};

  properties.forEach(property => {
    if (resourceProperties[property]) {
      requestedProperties[property] = resourceProperties[property];
    }
  });

  response.status(200).json(requestedProperties);
});

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
    response.status(409).json({ message: 'resource is already locked'});
  } else {
    resourceLocks.set(resource, { owner });

    response.status(200).json({ message: 'resource locked successfully'});
  }
});

const resourceLocks2 = new Map();

routes.unlock('/resource', (request, response) => {
  const { resource } = request.body;

  if (!resourceLocks2.has(resource)) {
    response.status(409).json({ message: 'resource is not locked' });
  } else {
    resourceLocks2.delete(resource);

    response.status(200).json({ message: 'resource unlocked successfully' });
  }
});

routes.report('/resource', (request, response) => {
  const data = {
    resource: '/resource',
    reportType: 'Example Report',
    data: {
      totalItems: 10,
      averageSize: '1 MB',
    }
  };

  response.status(200).json(data);
});

routes.mkcol('/collection', async (request, response) => {
  try {
    const collectionPath = './collections/collection';

    await fs.access(collectionPath);

    response.status(409).json({ message: 'collection already exists'});
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(collectionPath);

      response.status(200).json({ message: 'collection created successfully' });
    } else {
      response.status(500).json({ message: 'internal server error'});
    }
  }
});

let activities = [];

routes.mkactivity('/activities', (request, response) => {
  const { name, description } = request.body;

  const activity = {
    id: activities.length + 1,
    name,
    description
  };

  activities.push(activity);

  response.status(200).json(activity);
});

const checkedOutResources = new Set();

routes.checkout('/resource', (request, response) => {
  const resourceId = request.params.resourceId;

  if (checkedOutResources.has(resourceId)) {
    response.status(409).json({ message: 'resource is already checked out' });
  } else {
    checkedOutResources.add(resourceId);

    response.status(200).json({ message: 'resource checked out successfully' });
  }
});

routes.move('/resource', async (request, response) => {
  try {
    const sourcePath = './source/resource.txt';
    const destinationPath = './destination/resource.txt';

    await fs.access(sourcePath);

    await fs.rename(sourcePath, destinationPath);

    response.status(200).json({ message: 'resource moved successfully' });
  } catch (error) {
    if (error.code === 'ENOENT') {
      response.status(404).json({ message: 'source resource not found' });
    } else {
      response.status(500).json({ message: 'internal server error' });
    }
  }
});

let resourceData2 = {
  content: 'Initial content',
  version: 1
};

routes.merge('/resource', (request, response) => {
  try {
    const { changes } = request.body;

    applyChanges(resourceData2, changes);

    resourceData2.version++;

    response.status(200).json(resourceData2);
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ message: 'internal server error' });
  }
});

function applyChanges(resource, changes) {
  changes.forEach(change => {
    if (change.type === 'insert') {
      const { position, text } = change;
      
      resource.content = resource.content.slice(0, position) + text + resource.content.slice(position);
    } else if (change.type === 'delete') {
      const { start, end } = change;
      
      resource.content = resource.content.slice(0, start) + resource.content.slice(end);
    }
  });
}

routes.trace('/trace', (request, response) => {
  const headers = request.headers;
  const body = request.body;

  const responseText = `
      TRACE Request Received:
      =======================
      Request Method: ${request.method}
      Request URL: ${request.originalUrl}
      Request Headers: ${JSON.stringify(headers, null, 2)}
      Request Body: ${JSON.stringify(body, null, 2)}
  `;

  response.status(200).send(responseText);
});

routes.notify('/notify', (request, response) => {
  const { message } = request.body;

  sendNotificationToClient(message);

  response.status(200).json({ message: 'notification sent' });
});

function sendNotificationToClient(message) {
  console.log('Sending notification:', message);
}

routes.link('/posts/:postId/tags/:tagId', (request, response) => {
  const postId = request.params.postId;
  const tagId = request.params.tagId;

  associateTagWithPost(postId, tagId);

  response.status(200).json({ message: 'tag associated with post successfully' });
});

function associateTagWithPost(postId, tagId) {
  console.log(`Associating tag ${tagId} with post ${postId}`);
}

routes.unlink('/posts/:postId/tags/:tagId', (resquest, response) => {
  const postId = resquest.params.postId;
  const tagId = resquest.params.tagId;

  unlinkResources(postId, tagId);

  response.status(200).json({ message: 'tag not associate with post successfully' });
});

function unlinkResources(postId, tagId) {
  console.log(`Removing link between ${postId} and ${tagId}`);
}

export default routes;
