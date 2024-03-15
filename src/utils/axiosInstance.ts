import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://vending-machine-backend.vercel.app/',
});

export default axiosInstance;
