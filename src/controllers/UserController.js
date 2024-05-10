import api from '../services/api.js';

class UserController {
  async get(request, response) {
    const axios = await api.get('/data');
    
    return response.json(axios.data);
  }

  async post(request, response) {
    const data = request.body;
  
    const axios = await api.post('/data', data);
  
    return response.status(200).json(axios.data);
  }

  async put(request, response) {
    const id = request.params.id;
    const data = request.body;
  
    const axios = await api.get('/data');

    const users = axios.data;

    const index = users.findIndex(user => user.id === id);
  
    if (index !== -1) {
      users[index] = { ...users[index], ...data };

      response.status(200).json(users);
    } else {
      response.status(404).json({ message: 'user not found' });
    }
  }
}

export default new UserController();