import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SwitchTransition, Transition } from 'react-transition-group';
import styled from 'styled-components';

import AuthContainer from 'components/@shared/AuthContainer/AuthContainer.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import Logo from 'components/@shared/Logo/Logo.component';

import LoginInfoContainer from 'components/LoginInfoContaier/LoginInfoContainer.component';
import UserInfoContainer from 'components/UserInfoContainer/UserInfoContainer.component';

import { resetUserInfo } from 'redux/actions/userInfo.action';

import useFetch from 'hooks/useFetch';

import { API_URL_PATH } from 'constants/api';
import { processServerData } from 'utils';

const LogoBox = styled.div`
  margin: 3rem 0;
`;

const InfoDiv = styled(FlexBox).attrs({
  height: '100%',
  direction: 'column',
  justifyContent: 'center',
  gap: '25px',
})`
  overflow-x: hidden;
`;

const SlideDiv = styled.div`
  #userInfo {
    transition: 0.25s;
    transform: ${({ state }) => (state === 'entered' ? 'translateX(0)' : 'translateX(-100%)')};
  }
  #loginInfo {
    transition: 0.25s;
    transform: ${({ state }) => (state === 'entered' ? 'translateX(0)' : 'translateX(100%)')};
  }
`;

const SlideTransition = ({ children, ...rest }) => (
  <Transition {...rest}>{state => <SlideDiv state={state}>{children}</SlideDiv>}</Transition>
);

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.userInfo);
  const postUserInfo = processServerData(userInfo);
  const { fetchData: signUp } = useFetch({ method: 'post', url: API_URL_PATH.CUSTOMERS });
  const [showLoginInfo, setShowLoginInfo] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(resetUserInfo());
    };
  }, []);

  const handleShowComponent = () => {
    setShowLoginInfo(prev => !prev);
  };

  const handlePostUserInfo = async () => {
    await signUp(postUserInfo);
    alert('회원가입에 성공하셨습니다!');
    navigate('/login');
  };

  return (
    <AuthContainer>
      <Link to="/">
        <LogoBox>
          <Logo color="MINT_001" />
        </LogoBox>
      </Link>
      <InfoDiv>
        <SwitchTransition>
          <SlideTransition
            key={showLoginInfo ? 'loginInfo' : 'userInfo'}
            timeout={100}
            unmountOnExit
            mountOnEnter
          >
            {showLoginInfo ? (
              <LoginInfoContainer
                onClickPrev={handleShowComponent}
                onSubmit={handlePostUserInfo}
                userInfoButtonText="회원가입"
              />
            ) : (
              <UserInfoContainer onClickNext={handleShowComponent} />
            )}
          </SlideTransition>
        </SwitchTransition>
      </InfoDiv>
    </AuthContainer>
  );
}

export default SignUp;
