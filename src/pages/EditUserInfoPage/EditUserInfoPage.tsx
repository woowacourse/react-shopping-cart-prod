import { useEffect } from 'react';

import { ReactComponent as ZzangguLogo } from 'assets/Zzanggu.svg';
import EditUserInfoForm from 'components/EditUserInfoForm/EditUserInfoForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLogin } from 'utils/auth';

import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

import * as S from './EditUserInfoPage.styled';

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
    <S.Page>
      <S.EditContainer>
        <header>
          <S.Title>회원 정보 수정</S.Title>
          <ZzangguLogo width={200} height={180} />
        </header>
        <EditUserInfoForm />
      </S.EditContainer>
    </S.Page>
  );
}

export default EditUserInfoPage;
