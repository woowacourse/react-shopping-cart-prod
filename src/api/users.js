import requestAsync from './RequestAsync';

export const requestLogin = async (id, password) =>
  requestAsync.post('login', { username: id, password });
export const requestCheckDuplicatedId = async (id) =>
  requestAsync.get('customers/username/duplication', { username: id });

export const requestSignUp = async (formData) => {
  const res = await requestAsync.post('customers', formData);
  return res;
};

export const requestEditUserInfo = async (formData) =>
  requestAsync.put('customers/me', formData, true);
export const requestWithDrawUser = async () => requestAsync.delete('customers/me', true);
export const requestEditUserPassword = async (formData) =>
  requestAsync.put('customers/me/password', formData, true);
