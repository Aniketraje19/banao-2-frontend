import axios from 'axios';


const Axios = axios.create({

  baseURL: 'https://banao-atg-api.onrender.com/api/v1/', 
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const attachTokenToRequest = (token) => {
  Axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const removeTokenFromRequest = () => {
  Axios.interceptors.request.use(
    (config) => {
      delete config.headers.Authorization;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default Axios;