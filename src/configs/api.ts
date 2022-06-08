import Axios from 'axios';

const axios = Axios.create({
  baseURL:
    'http://ec2-13-125-246-80.ap-northeast-2.compute.amazonaws.com:8080/api',
});

export default axios;
