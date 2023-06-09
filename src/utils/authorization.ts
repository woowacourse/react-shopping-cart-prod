export const encrypt = (username: string, password: string) => btoa(username + ':' + password);
