import useServerSelect from 'hooks/apis/useServerSelect';
import Styled from 'page/CartPage/index.style';

const ServerSelectPage = () => {
  const { setServerApi } = useServerSelect();

  return (
    <Styled.Container>
      <button onClick={() => setServerApi('이프')}>이프</button>
      <button onClick={() => setServerApi('더즈')}>더즈</button>
      <button onClick={() => setServerApi('찬')}>찬</button>
      <button onClick={() => setServerApi('토르')}>토르</button>
    </Styled.Container>
  );
};

export default ServerSelectPage;
