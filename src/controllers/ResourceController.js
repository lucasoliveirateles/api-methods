import NotificationModel from '../models/NotificationModel.js';
import ResourceLockModel from '../models/ResourceLockModel.js';

class ResourceController {
  async head(request, response) {
    const axios = await api.get('/resource'); 
   
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(axios.data).length
    };
  
    response.writeHead(200, headers);
    
    response.end();
  }
  
  async propfind(request, response) {
    try {
      const { properties } = request.body;

      const requestedProperties = {};

      const axios = await api.get('/resource');

      const resourceProperties = axios.data;

      properties.forEach(property => {
        if (resourceProperties[property]) {
          requestedProperties[property] = resourceProperties[property];
        }
      });

      return response.status(200).json(requestedProperties);
    } catch (error) {
      return response.status(500).json({ message: 'server error' });
    }
  }

  async proppatch(request, response) {
    try {
      const { name, description } = request.body;

      if (name && description) {
        const axios = await api.proppatch('/resource', { name, description });
      
        return response.status(200).json(axios.data);
      }
    } catch (error) {
      return response.status(500).json({ message: 'server error' });
    }
  }

  notify(request, response) {
    try {
      const { message } = request.body;

      NotificationModel.sendNotification(message);

      response.status(200).json({ message: 'notification sent' });
    } catch (error) {
      return response.status(500).json({ message: 'server error' });
    }  
  }

  report(request, response) {
    try {
      const data = {
        resource: '/resource',
        reportType: 'Example Report',
        data: {
          totalItems: 10,
          averageSize: '1 MB',
        }
      };
      
      response.status(200).json(data);
    } catch (error) {
      return response.status(500).json({ message: 'server error' });
    }
  }

  lock(request, response) {
    const { resource, owner } = request.body;

    const resourceLocks = ResourceLockModel.getResource();

    if (resourceLocks.has(resource)) {
      response.status(409).json({ message: 'resource is already locked'});
    } else {
      resourceLocks.set(resource, { owner });

      response.status(200).json({ message: 'resource locked successfully'});
    } 
  }

  unlock(request, response) {
    try {
      const { resource } = request.body;

      const resourceLocks = ResourceLockModel.getResource();

      if (!resourceLocks.has(resource)) {
        response.status(409).json({ message: 'resource is not locked' });
      } else {
        resourceLocks.delete(resource);
    
        response.status(200).json({ message: 'resource unlocked successfully' });
      } 
    } catch (error) {
      return response.status(500).json({ message: 'server error' });
    }
  }
}

export default new ResourceController();