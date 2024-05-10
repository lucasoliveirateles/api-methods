import env from 'dotenv'
import axios from 'axios';

env.config();

const api = axios.create({
  baseURL: process.env.API_URL
});

export default api;
