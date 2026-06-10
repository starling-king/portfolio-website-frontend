import axios from 'axios';
import conf from '../config/config.js'; 

const apiClient = axios.create({
    baseURL: conf.backendApi, 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default apiClient;