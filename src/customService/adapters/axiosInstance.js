import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// Imprimir el valor de la URL base

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
