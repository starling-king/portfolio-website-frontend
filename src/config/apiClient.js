// import axios from 'axios';
// import conf from '../config/config.js'; 

// const apiClient = axios.create({
//     baseURL: conf.backendApi, 
//     timeout: 30000,
//     headers: {
//         'Content-Type': 'application/json',
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': '0'
//     },
//     withCredentials: true
// });

// let wakeupTimer;

// apiClient.interceptors.request.use((config) => {
//     wakeupTimer = setTimeout(() => {
//         window.dispatchEvent(new Event('server-waking'));
//     }, 2000);
    
//     return config;
// });

// apiClient.interceptors.response.use(
//     (response) => {
//         clearTimeout(wakeupTimer); // Cancel timer
//         window.dispatchEvent(new Event('server-awake')); 
//         return response;
//     },
//     (error) => {
//         clearTimeout(wakeupTimer); // Cancel timer on error
//         window.dispatchEvent(new Event('server-awake')); 
//         return Promise.reject(error);
//     }
// );

// export default apiClient;

import axios from 'axios';
import conf from '../config/config.js'; 

const apiClient = axios.create({
    baseURL: conf.backendApi, 
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    },
    withCredentials: true
});

apiClient.interceptors.request.use((config) => {
    config.wakeupTimer = setTimeout(() => {
        window.dispatchEvent(new Event('server-waking'));
    }, 2000);
    
    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        if (response.config && response.config.wakeupTimer) {
            clearTimeout(response.config.wakeupTimer);
        }
        window.dispatchEvent(new Event('server-awake')); 
        return response;
    },
    (error) => {
        if (error.config && error.config.wakeupTimer) {
            clearTimeout(error.config.wakeupTimer);
        }
        window.dispatchEvent(new Event('server-awake')); 
        return Promise.reject(error);
    }
);

export default apiClient;