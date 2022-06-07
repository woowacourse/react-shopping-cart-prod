import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { User } from 'types';
import useEditUserInfoForm from './useEditUserInfoForm';
import LabeledInput from 'components/@shared/LabeledInput';
import REG_EXP from 'constants/regExp';

function EditUserInfoForm() {
  const { handleClickWithdrawButton, handleSubmit } = useEditUserInfoForm();
  const { username, email, address, phoneNumber } = useSelector(
    (state: { user: User }) => state.user
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <LabeledInput id="id" type="text" value={username} disabled>
        아이디
      </LabeledInput>
      <LabeledInput id="email" type="email" value={email} disabled>
        이메일
      </LabeledInput>
      <LabeledInput
        id="address"
        type="address"
        placeholder="주소를 입력해주세요"
        maxLength={255}
        defaultValue={address}
        required
      >
        주소
      </LabeledInput>
      <LabeledInput
        id="phoneNumber"
        type="text"
        placeholder="핸드폰 번호를 입력해주세요"
        pattern={REG_EXP.PHONE_NUMBER}
        defaultValue={phoneNumber}
        required
      >
        핸드폰 번호
      </LabeledInput>
      <StyledButtons>
        <StyledWithdrawButton type="button" onClick={handleClickWithdrawButton}>
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
