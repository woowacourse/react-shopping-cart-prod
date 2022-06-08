import { PATH_NAME } from 'constants';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteCookie } from 'utils/cookie';

const ServerPick = () => {
  const navigate = useNavigate();
  const handleSetApi = (apiUrl) => {
    deleteCookie(process.env.REACT_APP_AUTH_COOKIE_KEY);
    localStorage.setItem('serverUrl', apiUrl);
    navigate(PATH_NAME.PRODUCT);
  };
  return (
    <Container>
      <Wrapper>
        <PickButton
          boxShadowColor={'#5e04be'}
          onClick={() => handleSetApi(process.env.REACT_APP_API_HUNI_URL)}
        >
          후니
          <span>후니 pick up</span>
        </PickButton>
        <PickButton
          boxShadowColor={'#9a3ffb'}
          onClick={() => handleSetApi(process.env.REACT_APP_API_MARU_URL)}
        >
          마루
          <span>마루 pick up</span>
        </PickButton>
        <PickButton
          boxShadowColor={'#ff6161'}
          onClick={() => handleSetApi(process.env.REACT_APP_API_ARI_URL)}
        >
          아리
          <span>아리 pick up</span>
        </PickButton>
        <PickButton
          boxShadowColor={'#fb9a3f'}
          onClick={() => handleSetApi(process.env.REACT_APP_API_REX_URL)}
        >
          렉스
          <span>렉스 pick up</span>
        </PickButton>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
`;

const PickButton = styled.button`
  width: 160px;
  padding: 15px;
  border-radius: 10px;
  font-family: 'Noto Sans JP', sans-serif;
  cursor: pointer;
  font-size: 1em;
  border: none;
  color: white;

  color: #9a3ffb;
  box-shadow: ${({ boxShadowColor }) => `0px 9px 0px ${boxShadowColor}`};
  border: 0.3px solid #5e04be;
  background-color: transparent;
  position: relative;
  overflow: hidden;

  & > span:last-of-type {
    display: none;
    color: white;
    font-weight: bold;
  }

  &:before {
    content: '';
    clip-path: polygon(0 0, 0% 100%, 100% 100%);
    position: absolute;
    height: 110%;
    width: 100%;
    top: 0;
    left: -200px;
    background: #9a3ffb;
    border-radius: 10px;
    z-index: -1;
    transition: 1s;
  }

  &:after {
    content: '';
    clip-path: polygon(0 0, 100% 100%, 100% 0);
    position: absolute;
    height: 110%;
    width: 100%;
    top: 0;
    left: 200px;
    background: #9a3ffb;
    border-radius: 10px;
    z-index: -1;
    transition: 1s;
  }

  &:hover > span:first-of-type {
    display: none;
  }
  &:hover > span:last-of-type {
    display: inline-block;
  }

  &:hover:before {
    left: 0;
  }
  &:hover:after {
    left: 0;
  }
`;

export default ServerPick;
