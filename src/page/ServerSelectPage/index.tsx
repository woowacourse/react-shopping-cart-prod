import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Styled from './index.style';

// 이프
const SERVER_URL1 = 'http://ec2-3-39-234-109.ap-northeast-2.compute.amazonaws.com:8080/';

// 더즈
const SERVER_URL2 = 'http://15.164.211.129:8080/';

// 토르
const SERVER_URL3 = 'http://ec2-15-164-232-166.ap-northeast-2.compute.amazonaws.com:8080/';

// 찬
const SERVER_URL4 = 'http://ec2-3-34-130-116.ap-northeast-2.compute.amazonaws.com:8080/';

const ServerSelectPage = () => {
  const navigate = useNavigate();

  const select = name => {
    switch (name) {
      case '이프':
        axios.defaults.baseURL = SERVER_URL1;
        break;

      case '더즈':
        axios.defaults.baseURL = SERVER_URL2;
        break;

      case '토르':
        axios.defaults.baseURL = SERVER_URL3;
        break;

      case '찬':
        axios.defaults.baseURL = SERVER_URL4;
        break;
    }

    navigate('/');
  };

  return (
    <Styled.Container>
      <Styled.SelectButton onClick={() => select('이프')}>이프 ❤️</Styled.SelectButton>
      <Styled.SelectButton onClick={() => select('더즈')}>더즈 🧡</Styled.SelectButton>
      <Styled.SelectButton onClick={() => select('토르')}>토르 💛</Styled.SelectButton>
      <Styled.SelectButton onClick={() => select('찬')}>찬 💚</Styled.SelectButton>
    </Styled.Container>
  );
};

export default ServerSelectPage;
