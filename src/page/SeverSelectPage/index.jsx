import Styled from 'page/CartPage/index.style';

export let selectedApiName = '찬';

const SeverSelectPage = () => {
  const handleClick = name => {
    selectedApiName = name;
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
