class ResourceController {
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
}

export default new ResourceController();