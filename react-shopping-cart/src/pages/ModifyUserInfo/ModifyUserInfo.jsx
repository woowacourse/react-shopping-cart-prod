import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { SwitchTransition, Transition } from 'react-transition-group';
import styled from 'styled-components';

import AuthContainer from 'components/@shared/AuthContainer/AuthContainer.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import Logo from 'components/@shared/Logo/Logo.component';

import LoginInfoContainer from 'components/LoginInfoContaier/LoginInfoContainer.component';
import UserInfoContainer from 'components/UserInfoContainer/UserInfoContainer.component';

import { resetUserInfo, setUserInfo } from 'redux/actions/userInfo.action';
import { initialUserInfoState } from 'redux/reducers/userInfo.reducer';

import useFetch from 'hooks/useFetch';

import { API_URL_PATH } from 'constants/api';
import { processServerData } from 'utils';

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

function ModifyUserInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoginInfo, setShowLoginInfo] = useState(false);
  const { accessToken, ...currentUserInfo } = useSelector(state => state.auth);

  const userInfo = useSelector(state => state.userInfo);
  const putUserInfo = processServerData(userInfo);
  const { fetchData: modifyInfo } = useFetch({
    url: API_URL_PATH.CUSTOMERS,
    method: 'put',
    headers: { accessToken: `Bearer ${accessToken}`, 'Access-Control-Allow-Origin': true },
    skip: true,
  });

  useEffect(() => {
    const userInfo = Object.entries(currentUserInfo).reduce(
      (acc, [key, value]) => {
        if (key === 'email') {
          return { ...acc, [key]: { value, error: false, disabled: true } };
        }
        if (key === 'phoneNumber') {
          return { ...acc, [key]: { ...value } };
        }
        return { ...acc, [key]: { value, error: false } };
      },
      { ...initialUserInfoState }
    );
    dispatch(setUserInfo(userInfo));
    return () => {
      dispatch(resetUserInfo());
    };
  }, []);

  const handleShowComponent = () => {
    setShowLoginInfo(prev => !prev);
  };

  const handlePutUserInfo = async () => {
    console.log(putUserInfo);
    await modifyInfo(putUserInfo);
    alert('정보 수정 완료했습니다!');
    navigate('/');
  };

  return (
    <AuthContainer>
      <InfoDiv>
        <Link to="/">
          <Logo color="MINT_001" />
        </Link>
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
                onSubmit={handlePutUserInfo}
                userInfoButtonText="정보 수정"
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

export default ModifyUserInfo;
