const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;

const base64 = btoa(email + ':' + password);

export default base64;
