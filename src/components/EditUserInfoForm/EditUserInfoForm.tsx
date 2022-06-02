import { useDispatch, useSelector } from 'react-redux';

import PATH from 'constants/path';
import { USER_MESSAGE } from 'constants/message';
import { User } from 'types/index';
import authAPI from 'apis/auth';
import { axios } from 'configs/api';
import { createInputValueGetter } from 'utils/dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { userActions } from 'redux/actions';

function EditUserInfoForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state: { user: User }) => state.user.username);
  const email = useSelector((state: { user: User }) => state.user.email);

  const onClickWithdrawButton = async () => {
    if (!confirm(USER_MESSAGE.ASK_WITH_DRAW)) return;

    try {
      await authAPI.deleteUser();
      dispatch(userActions.resetUser());
      navigate(PATH.BASE);
    } catch (error) {
      alert(USER_MESSAGE.FAIL_WITH_DRAW);
    }
  };

  const onSubmitEditUserInfoForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const formElement = e.target.elements;
    const getInputValue = createInputValueGetter(formElement);
    const user = {
      address: getInputValue('address'),
      phoneNumber: getInputValue('phoneNumber'),
    };

    try {
      await authAPI.editUserInfo(user);

      dispatch(userActions.setUser(user));
      navigate(PATH.BASE);
    } catch (error) {
      alert(USER_MESSAGE.FAIL_EDIT);
    }
  };

  return (
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
  );
}

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

export default EditUserInfoForm;
