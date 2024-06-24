import fs from 'fs';
import { Router } from 'express';

import UserController from '../controllers/UserController.js';
import HttpController from '../controllers/HttpController.js';
import ResourceController from '../controllers/ResourceController.js';

const routes = new Router();

routes.get('/users', UserController.get);
routes.post('/users', UserController.post);
routes.put('/users/:id', UserController.put);
routes.delete('/users/:id', UserController.delete);
routes.patch('/users/:id', UserController.patch);
routes.options('/http', HttpController.options);
routes.propfind('/resource', ResourceController.propfind);
routes.proppatch('/resource', ResourceController.proppatch);
routes.head('/resource', ResourceController.head);
routes.notify('/notify', ResourceController.notify);
routes.report('/resource', ResourceController.report);
routes.lock('/resource', ResourceController.lock);
routes.unlock('/resource', ResourceController.unlock);
routes.copy('/resource', ResourceController.copy);
routes.trace('/trace', ResourceController.trace);

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
