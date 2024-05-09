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
}

export default new UserController();