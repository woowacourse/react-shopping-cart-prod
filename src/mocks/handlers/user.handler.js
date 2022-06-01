const userDB = () => {
  let user = JSON.parse(window.localStorage.getItem('server-user')) || [];

  const getUser = () => user;
  const setUser = (newUser) => {
    user = newUser;
    window.localStorage.setItem('server-user', JSON.stringify(newUser));
  };

  return { getUser, setUser };
};

const { getUser, setUser } = userDB();

export const checkUniqueEmail = (req, res, ctx) => {
  const currentUserList = getUser();
  const email = req.url.searchParams.get('email');

  const isUnique = currentUserList.every((user) => user.email !== email);

  return res(ctx.status(200), ctx.json({ success: isUnique }));
};

export const postUser = (req, res, ctx) => {
  const currentUserList = getUser();
  const userData = req.body;

  currentUserList.push(userData);

  setUser(currentUserList);

  return res(ctx.status(201));
};

export const login = (req, res, ctx) => {
  const currentUserList = getUser();
  const { email: requestEmail, password: requestPassword } = req.body;

  const userData = currentUserList.find(
    ({ email, password }) => email === requestEmail && password === requestPassword,
  );

  if (userData !== undefined) {
    const { email, nickname } = userData;

    return res(ctx.status(200), ctx.json({ nickname, token: email }));
  }

  return res(ctx.status(400));
};

export const handleUserGetRequest = (req, res, ctx) => {
  const currentUserList = getUser();

  const token = req.headers.get('Authorization').split(' ')[1];

  const userData = currentUserList.find(({ email }) => email === token);

  if (userData !== undefined) {
    const { email, nickname } = userData;

    return res(ctx.status(200), ctx.json({ email, nickname }));
  }

  return res(ctx.status(404));
};

export const handlePasswordCheck = (req, res, ctx) => {
  const currentUserList = getUser();

  const token = req.headers.get('Authorization').split(' ')[1];
  const { password } = req.body;

  const userData = currentUserList.find(({ email }) => email === token);

  if (userData === undefined) {
    return res(ctx.status(404));
  }

  const success = userData.password === password;
  return res(ctx.status(200), ctx.json({ success }));
};
