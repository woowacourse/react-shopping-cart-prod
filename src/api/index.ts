import axios from 'axios';

const BACK_URL_ELLIE = 'http://ec2-54-180-82-199.ap-northeast-2.compute.amazonaws.com:8080';

const apiClient = axios.create({
  baseURL: BACK_URL_ELLIE,
});

export default apiClient;
