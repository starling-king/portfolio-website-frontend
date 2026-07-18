// // import axios from 'axios';
// // import conf from '../config/config.js'; 

// // const apiClient = axios.create({
// //     baseURL: conf.backendApi, 
// //     timeout: 30000,
// //     headers: {
// //         'Content-Type': 'application/json',
// //         'Cache-Control': 'no-cache, no-store, must-revalidate',
// //         'Pragma': 'no-cache',
// //         'Expires': '0'
// //     },
// //     withCredentials: true
// // });

// // let wakeupTimer;

// // apiClient.interceptors.request.use((config) => {
// //     wakeupTimer = setTimeout(() => {
// //         window.dispatchEvent(new Event('server-waking'));
// //     }, 2000);
    
// //     return config;
// // });

// // apiClient.interceptors.response.use(
// //     (response) => {
// //         clearTimeout(wakeupTimer); // Cancel timer
// //         window.dispatchEvent(new Event('server-awake')); 
// //         return response;
// //     },
// //     (error) => {
// //         clearTimeout(wakeupTimer); // Cancel timer on error
// //         window.dispatchEvent(new Event('server-awake')); 
// //         return Promise.reject(error);
// //     }
// // );

// // export default apiClient;

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

// apiClient.interceptors.request.use((config) => {
//     config.wakeupTimer = setTimeout(() => {
//         window.dispatchEvent(new Event('server-waking'));
//     }, 2000);
    
//     return config;
// });

// apiClient.interceptors.response.use(
//     (response) => {
//         if (response.config && response.config.wakeupTimer) {
//             clearTimeout(response.config.wakeupTimer);
//         }
//         window.dispatchEvent(new Event('server-awake')); 
//         return response;
//     },
//     (error) => {
//         if (error.config && error.config.wakeupTimer) {
//             clearTimeout(error.config.wakeupTimer);
//         }
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

// --- SERVER WAKEUP LOGIC ---
apiClient.interceptors.request.use((config) => {
    config.wakeupTimer = setTimeout(() => {
        window.dispatchEvent(new Event('server-waking'));
    }, 2000);
    return config;
});

// --- REFRESH TOKEN QUEUE STATE ---
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => {
        if (response.config && response.config.wakeupTimer) {
            clearTimeout(response.config.wakeupTimer);
        }
        window.dispatchEvent(new Event('server-awake')); 
        return response;
    },
    async (error) => {
        if (error.config && error.config.wakeupTimer) {
            clearTimeout(error.config.wakeupTimer);
        }
        window.dispatchEvent(new Event('server-awake')); 

        const originalRequest = error.config;

        // --- THE AUTO-REFRESH LOGIC ---
        if (error.response?.status === 401 && !originalRequest._retry) {
            
            // 1. Prevent infinite loops if the refresh token itself is expired
            if (originalRequest.url.includes('/admin/refreshAccessToken')) {
                return Promise.reject(error);
            }

            // 2. If a refresh is already happening, freeze this request and add it to the queue
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject })
                }).then(() => {
                    return apiClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            // 3. Lock the interceptor so no other requests trigger a refresh
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // 4. Use a raw axios call to avoid Circular Dependency crashes
                await axios.post(`${conf.backendApi}/admin/refreshAccessToken`, {}, {
                    withCredentials: true 
                });
                
                // 5. Release the queue and replay the frozen requests
                processQueue(null);
                
                // 6. Replay the original request that triggered the 401
                return apiClient(originalRequest);
                
            } catch (refreshError) {
                // If the refresh fails (Refresh Token expired), destroy the queue and reject
                processQueue(refreshError, null);
                
                // The React component will catch this rejection and dispatch logout()
                return Promise.reject(refreshError);
            } finally {
                // Unlock the interceptor
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;