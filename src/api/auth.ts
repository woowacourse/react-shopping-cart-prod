import { url } from './url';

// 사용자 이름과 비밀번호
const username = 'a@a.com';
const password = '1234';

// Base64로 인코딩
export const base64 = btoa(username + ':' + password);

export const fetchMemberList = async (server: string) => {
  try {
    const response = await fetch(`${url[server]}/members`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
