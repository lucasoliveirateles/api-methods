import api from '../services/api.js';

class UserController {
  async get(request, response) {
    try {
      const axios = await api.get('/data');
    
      return response.status(200).json(axios.data);  
    } catch (error) {
      return response.status(500).json({ message: 'server error' }); 
    }
  }

  async post(request, response) {
    try {
      const data = request.body;
  
      const axios = await api.post('/data', data);
    
      return response.status(200).json(axios.data); 
    } catch (error) {
      return response.status(500).json({ message: 'server error' }); 
    }
  }

  async put(request, response) {
    const id = request.params.id;
    const data = request.body;
  
    const axios = await api.get('/data');

    const index = axios.data.findIndex(user => user.id === id);
  
    if (index !== -1) {
      const axios = await api.put(`/data/${id}`, data);

      response.status(200).json(axios.data);
    } else {
      response.status(404).json({ message: 'user not found' });
    }
  }

  async delete(request, response) {
    try {
      const id = request.params.id;

      const axios = await api.get('/data');
      
      const user = axios.data.filter(user => user.id !== id);
  
      if (user) {
        await api.delete(`/data/${id}`);

        return response.status(204).send(); 
      }
     
      throw new Error();
      
    } catch (error) {
      return response.status(404).json({ message: 'user not found' });
    }
  }

  async patch(request, response) {
    try {
      const id = request.params.id;
      const data = request.body;

      const axios = await api.get('/data');
      
      const user = axios.data.filter(user => user.id !== id);
  
      if (user) {
        await api.patch(`/data/${id}`, data);

        return response.status(204).send(); 
      }
     
      throw new Error();
    } catch (error) {
      return response.status(404).json({ message: 'user not found' });
    }
  }
}

export default new UserController();