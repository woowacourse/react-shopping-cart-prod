import Styled from 'page/CartPage/index.style';
import { useNavigate } from 'react-router-dom';

export let selectedApiName = '이프';

const SeverSelectPage = () => {
  const navigate = useNavigate();
  const handleClick = name => {
    selectedApiName = name;
    navigate('/');
  };

  return (
    <Styled.Container>
      <button onClick={() => handleClick('이프')}>이프</button>
      <button onClick={() => handleClick('더즈')}>더즈</button>
      <button onClick={() => handleClick('찬')}> 찬</button>
      <button onClick={() => handleClick('토르')}>토르</button>
    </Styled.Container>
  );
};

export default SeverSelectPage;
