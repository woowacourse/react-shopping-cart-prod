import axios from 'axios';
import { SERVER_URL } from 'configs/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SigninResponseBody } from 'types';

import { actions } from 'redux/actions';

const useSigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const requestBody = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post<SigninResponseBody>(
        `${SERVER_URL}/api/customer/authentication/sign-in`,
        requestBody
      );
      const { accessToken, userId } = response.data;

      localStorage.setItem('accessToken', accessToken);
      dispatch(actions.getUserId(userId));
      dispatch(actions.getUserInfo(accessToken, userId));
      navigate('/');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('이메일 혹은 패스워드가 잘못되어 로그인에 실패하였습니다.');
      } else {
        alert(e);
      }
    }
  };

  return { handleSubmit };
};

export default useSigninForm;
