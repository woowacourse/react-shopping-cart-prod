import { atom } from 'recoil';
import { USER_INFORMATION, UserInformationType } from '@constants/userConstant';

const userState = atom<UserInformationType>({
  key: 'userState',
  default: USER_INFORMATION[0],
});

export default userState;
