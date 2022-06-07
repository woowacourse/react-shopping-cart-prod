import authAPI from 'apis/auth';
import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from 'redux/actions';
import { snackBarActions } from 'redux/reducers/snackBar';
import { createInputValueGetter } from 'utils/dom';

const useEditUserInfoForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickWithdrawButton = async () => {
    if (!confirm(USER_MESSAGE.ASK_WITH_DRAW)) return;

    try {
      await authAPI.deleteUser();
      dispatch(userActions.resetUser());
      navigate(PATH.BASE);
    } catch (error) {
      alert(USER_MESSAGE.FAIL_WITH_DRAW);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const formElement = e.target.elements;
    const getInputValue = createInputValueGetter(formElement);
    const userInputInfo = {
      address: getInputValue('address'),
      phoneNumber: getInputValue('phoneNumber'),
    };

    try {
      const userInfo = await authAPI.editUserInfo(userInputInfo);

      dispatch(snackBarActions.show('회원정보 수정에 성공했습니다 😀'));
      dispatch(userActions.setUser(userInfo));
      navigate(PATH.BASE);
    } catch (error) {
      alert(USER_MESSAGE.FAIL_EDIT);
    }
  };

  return {
    handleClickWithdrawButton,
    handleSubmit,
  };
};

export default useEditUserInfoForm;
