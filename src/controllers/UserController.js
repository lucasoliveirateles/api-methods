import api from '../services/api.js';

class UserController {
  async get(request, response) {
    const axios = await api.get('/data');
    
    return response.json(axios.data);
  }
}

export default new UserController();