import { requestCheckUserId, requestCheckUserNickname } from 'api/members';
import { REQUEST_STATUS } from 'constants/';

const isUserId = (value) =>
  /^([0-9a-zA-Z_\\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/g.test(value);

const isUserPassword = (value) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/g.test(value);

const isPasswordConfirm = (password, passwordConfirm) => password === passwordConfirm;

const isNickname = (value) => /^[a-zA-Z가-힣0-9]{2,10}$/g.test(value);

const userValidator = {
  userId: async (userId) => {
    if (!isUserId(userId)) {
      throw new Error('이메일 주소를 정확히 입력해주세요.');
    }

    const { status, content } = await requestCheckUserId(userId);
    if (status === REQUEST_STATUS.FAIL) {
      throw new Error(content.message);
    }
  },
  password: (password) => {
    if (!isUserPassword(password)) {
      throw new Error('영문, 숫자, 특수문자를 포함한 최소 8자, 최대 16자 이내로 입력해주세요.');
    }
  },
  passwordConfirm: (oldPassword, newPassword) => {
    if (oldPassword !== newPassword) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
  },
  nickname: async (nickname) => {
    if (!isNickname(nickname)) {
      throw new Error('한글, 영문, 숫자로 최소 2자부터 최대 10자까지 입력할 수 있습니다.');
    }

    const { status, content } = requestCheckUserNickname(nickname);
    if (status === REQUEST_STATUS.FAIL) {
      throw new Error(content.message);
    }
  },
};

export { isUserId, isUserPassword, isPasswordConfirm, isNickname, userValidator };
