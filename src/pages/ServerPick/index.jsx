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
      <HeaderTitleWrapper>
        <h1>장바구니 협업 미션</h1>
      </HeaderTitleWrapper>
      <MarqueeWrapper>
        <MarqueeText>
          <span>Frontend Developer</span> <span>호프, 코카콜라</span>
        </MarqueeText>
        <MarqueeText>
          <span>Backend Developer</span> <span>후니, 마루, 아리, 렉스</span>
        </MarqueeText>
      </MarqueeWrapper>

      <Wrapper>
        <TextWrapper>
          <div>서버</div>
          <div>PICK</div>
          <div>UP</div>
        </TextWrapper>
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

const HeaderTitleWrapper = styled.div`
  width: 500px;
  font-family: Cantata One, Arial, sans-serif;
  color: #0f0e0e;
`;

const MarqueeWrapper = styled.div`
  width: 500px;
  height: 100px;
  margin: 25px auto;
  overflow: hidden;
  position: relative;
  border: 1px solid #000;
  margin: 25px auto;

  border-radius: 5px;
  box-shadow: inset 0px 3px 3px rgba(0, 0, 0, 0.5),
    0px 2px 0px rgba(250, 250, 250, 0.2);

  background-color: #ff333390;

  & > p:nth-child(1) {
    animation: left-one 15s ease infinite;
  }

  & > p:nth-child(2) {
    animation: left-two 15s ease infinite;
  }

  @keyframes left-one {
    0% {
      transform: translateX(100%);
    }
    10% {
      transform: translateX(0);
    }
    40% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  @keyframes left-two {
    0% {
      transform: translateX(100%);
    }
    50% {
      transform: translateX(100%);
    }
    60% {
      transform: translateX(0);
    }
    90% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;
const MarqueeText = styled.p`
  position: absolute;
  font-family: Cantata One, Arial, sans-serif;
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-weight: 500;
  font-size: 2rem;
  text-shadow: 1px 1px 0px #000000;
  filter: dropshadow(color=#000000, offx=1, offy=1);

  transform: translateX(100%);
  display: flex;
  flex-direction: column;

  font-family: ${({ theme }) => theme.FONT.PRIMARY};
`;

const TextWrapper = styled.div`
  overflow: hidden;
  height: calc(2.7rem);
  font-family: ${({ theme }) => theme.FONT.PRIMARY};
  & > div {
    font-weight: 600;
    font-size: 2rem;
    color: #c888eb;
    animation: 5s linear 0s infinite normal upTop;
  }
  @keyframes upTop {
    0% {
      transform: translateY(2rem);
    }
    10%,
    20%,
    30% {
      transform: translateY(0rem);
    }
    40%,
    50%,
    60% {
      transform: translateY(-2rem);
    }
    70%,
    80%,
    90%,
    100% {
      transform: translateY(-5rem);
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Cantata One, Arial, sans-serif;
`;

const Wrapper = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
  z-index: 100;
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
