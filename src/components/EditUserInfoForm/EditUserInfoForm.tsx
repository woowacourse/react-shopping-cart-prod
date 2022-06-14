import authAPI from 'apis/auth';
import { Button, Form, Input } from 'components/@shared';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from 'redux/actions';
import { User } from 'types';
import { createInputValueGetter } from 'utils/dom';
import { formatPhoneNumber } from 'utils/formats';

import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

import * as S from './EditUserInfoForm.styled';

function EditUserInfoForm() {
  const { username, email, address, phoneNumber } = useSelector(
    (state: { user: User }) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickWithdrawButton = async () => {
    if (!window.confirm(USER_MESSAGE.ASK_WITH_DRAW)) return;

    try {
      await authAPI.deleteUser();

      dispatch(userActions.resetUser());
      navigate(PATH.BASE);
    } catch (error) {
      alert(USER_MESSAGE.FAIL_WITH_DRAW);
    }
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const formElement = e.target.elements;
    const getInputValue = createInputValueGetter(formElement);
    const phoneNumber = getInputValue('phoneNumber');
    const userInputInfo = {
      address: getInputValue('address'),
      phoneNumber: formatPhoneNumber(phoneNumber),
    };

    if (!phoneNumber.startsWith('010') || phoneNumber.length !== 11) {
      alert(USER_MESSAGE.WRONG_PHONE_NUMBER);

      return;
    }

    try {
      const userInfo = await authAPI.editUserInfo(userInputInfo);

      dispatch(userActions.setUser(userInfo));
      navigate(PATH.BASE);
    } catch (error) {
      alert(USER_MESSAGE.FAIL_EDIT);
    }
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Input id="id" type="text" value={username} disabled>
        아이디
      </Input>
      <Input id="email" type="email" value={email} disabled>
        이메일
      </Input>
      <Input
        id="address"
        type="address"
        placeholder="주소를 입력해주세요"
        defaultValue={address}
        required
      >
        주소
      </Input>
      <Input
        id="phoneNumber"
        type="number"
        maxLength={11}
        placeholder="핸드폰 번호를 입력해주세요"
        defaultValue={phoneNumber?.replaceAll('-', '')}
        required
      >
        핸드폰 번호
      </Input>
      <S.OptionContainer>
        <Button
          type="button"
          onClick={onClickWithdrawButton}
          marginTop="20px"
          reverse={true}
        >
          회원 탈퇴
        </Button>
        <Button type="submit" marginTop="20px">
          회원 정보 수정
        </Button>
      </S.OptionContainer>
    </Form>
  );
}

export default EditUserInfoForm;
