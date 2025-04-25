// axiosConfig.js (create this file)
import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  }
});

export default instance;
