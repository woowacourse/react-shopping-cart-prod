import axios from 'axios';
import { SERVER_URL } from 'configs/api';
import { useNavigate } from 'react-router-dom';
import { SigninResponseBody } from 'types';

const useSigninForm = () => {
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
      localStorage.setItem('userId', String(userId));
      navigate('/');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('유효하지 않은 이메일 형식입니다.');
      } else {
        alert(e);
      }
    }
  };

  return { handleSubmit };
};

export default useSigninForm;
