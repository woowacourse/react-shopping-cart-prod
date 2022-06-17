import Axios from 'axios';


const axios = Axios.create({
  baseURL:
    'http://ec2-15-164-94-21.ap-northeast-2.compute.amazonaws.com:8080/api',
});

export default axios;

// - `매트`: http://ec2-15-164-94-21.ap-northeast-2.compute.amazonaws.com:8080/
// - `야호`: http://ec2-13-125-121-5.ap-northeast-2.compute.amazonaws.com:8080/
// - `차리`: http://ec2-13-125-246-80.ap-northeast-2.compute.amazonaws.com:8080/
// - `슬로`: http://ec2-15-164-49-241.ap-northeast-2.compute.amazonaws.com:8080/