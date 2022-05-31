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
