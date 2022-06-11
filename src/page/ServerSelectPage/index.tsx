import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL } from 'utils/constants';
import Styled from './index.style';

const ServerSelectPage = () => {
  const navigate = useNavigate();

  const select = name => {
    axios.defaults.baseURL = URL[`${name}_서버`];
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
