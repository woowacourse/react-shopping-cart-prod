const username = 'a@a.com';
const password = '1234';

// Base64로 인코딩
export const base64 = btoa(username + ':' + password);
