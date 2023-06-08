const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;

const credentials = btoa(email + ':' + password);

export default credentials;
