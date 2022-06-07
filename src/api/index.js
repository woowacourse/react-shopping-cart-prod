import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_ARI_URL}/api`,
});

export default apiClient;
