import { useDispatch, useSelector } from 'react-redux';

import PATH from 'constants/path';
import { USER_MESSAGE } from 'constants/message';
import { User } from 'types/index';
import { ReactComponent as ZzangguLogo } from 'assets/Zzanggu.svg';
import { axios } from 'configs/api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { userActions } from 'redux/actions';

function EditUserInfoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state: { user: User }) => state.user.username);
  const email = useSelector((state: { user: User }) => state.user.email);

  const onClickWithdrawButton = () => {
    if (!confirm(USER_MESSAGE.ASK_WITH_DRAW)) return;

    const accessToken =
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken');

    axios
      .delete(PATH.REQUEST_CUSTOMER_ME, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('accessToken');

        dispatch(userActions.resetUser());

        navigate(PATH.BASE);
      })
      .catch(error => console.log(error));
  };

  const onSubmitEditUserInfoForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const formElements = e.target.elements;
    const user = {
      address: (formElements.namedItem('address') as HTMLInputElement).value,
      phoneNumber: (formElements.namedItem('phoneNumber') as HTMLInputElement)
        .value,
    };
    const accessToken =
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken');

    axios
      .put(PATH.REQUEST_CUSTOMER_ME, user, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        dispatch(userActions.setUser(user));
        navigate(PATH.BASE);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <StyledPage>
      <StyledEditContainer>
        <header>
          <StyledTitle>회원 정보 수정</StyledTitle>
          <ZzangguLogo width={200} height={180} />
        </header>
        <StyledForm onSubmit={onSubmitEditUserInfoForm}>
          <label htmlFor="id">아이디</label>
          <input id="id" type="text" value={username} disabled />
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" value={email} disabled />
          <label htmlFor="address">주소</label>
          <input
            id="address"
            type="address"
            placeholder="주소를 입력해주세요"
            required
          />
          <label htmlFor="phoneNumber">핸드폰 번호</label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="핸드폰 번호를 입력해주세요"
            required
          />
          <StyledButtons>
            <StyledWithdrawButton type="button" onClick={onClickWithdrawButton}>
              회원 탈퇴
            </StyledWithdrawButton>
            <StyledEditButton type="submit">회원 정보 수정</StyledEditButton>
          </StyledButtons>
        </StyledForm>
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  > label {
    margin-top: 4px;
    font-size: 14px;
  }

  > input {
    border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
    border-radius: 2px;
    padding: 6px 8px;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const StyledWithdrawButton = styled.button`
  width: 50%;
  height: 40px;
  background: ${({ theme: { colors } }) => colors.white};
  color: ${({ theme: { colors } }) => colors.redPink};
  border: 1px solid ${({ theme: { colors } }) => colors.redPink};
  border-radius: 5px;
  margin-top: 20px;

  font-size: 17px;
  font-weight: 900;
`;

const StyledEditButton = styled.button`
  width: 50%;
  height: 40px;
  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};
  border-radius: 5px;
  margin-top: 20px;

  font-size: 17px;
  font-weight: 900;
`;

export default EditUserInfoPage;
