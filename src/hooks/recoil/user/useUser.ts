import { useRecoilState } from 'recoil';
import userState from '@recoil/user/userState';
import { USER_INFORMATION } from '@constants/userConstant';

export const useUser = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const handleUser = (nickname: string) => {
    const findUser = USER_INFORMATION.find((user) => user.nickname === nickname);

    if (!findUser) {
      throw new Error('바꾸고자 하는 유저가 존재하지 않습니다.');
    }

    setUserInfo(findUser);
  };

  return { userInfo, handleUser };
};
