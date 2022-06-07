import { useEffect } from 'react';

import { ReactComponent as ZzangguLogo } from 'assets/Zzanggu.svg';
import EditUserInfoForm from 'components/EditUserInfoForm/EditUserInfoForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isLogin } from 'utils/auth';

import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

function EditUserInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin()) {
      alert(USER_MESSAGE.NEED_LOGIN);
      navigate(PATH.LOGIN, { replace: true });

      return;
    }
  }, [dispatch, navigate]);

  return (
    <StyledPage>
      <StyledEditContainer>
        <header>
          <StyledTitle>회원 정보 수정</StyledTitle>
          <ZzangguLogo width={200} height={180} />
        </header>
        <EditUserInfoForm />
      </StyledEditContainer>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  width: 480px;
  margin: 60px 0;
  background: ${({ theme: { colors } }) => colors.white};
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
  padding: 50px;
`;

const StyledTitle = styled.h1`
  text-align: center;

  color: ${({ theme: { colors } }) => colors.redPink};

  font-weight: 900;
  font-size: 24px;
`;

export default EditUserInfoPage;
