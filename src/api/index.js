import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_REX_URL}/api`,
});

export default apiClient;
