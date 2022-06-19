import axios from 'axios';

const getServerUrl = () => {
  if (localStorage.getItem('serverUrl') === null)
    return process.env.REACT_APP_API_ARI_URL;

  return localStorage.getItem('serverUrl');
};

const apiClient = axios.create({
  baseURL: `${getServerUrl()}/api`,
});

export default apiClient;
