const username = 'a@a.com';
const password = '1234';

export const auth = btoa(username + ':' + password);
