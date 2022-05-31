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
  const { email } = req.params;

  const isUnique = currentUserList.every((user) => user.email !== email);

  return res(ctx.json({ success: isUnique }));
};
