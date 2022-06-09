import useServerSelect from 'hooks/apis/useServerSelect';
import Styled from 'page/CartPage/index.style';

export const AUTH_API_URL = {
  이프: 'http://ec2-3-39-234-109.ap-northeast-2.compute.amazonaws.com:8080',
  찬: 'http://ec2-3-34-130-116.ap-northeast-2.compute.amazonaws.com:8080',
  더즈: 'http://15.164.211.129:8080',
  토르: 'http://ec2-15-164-232-166.ap-northeast-2.compute.amazonaws.com:8080',
};

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
