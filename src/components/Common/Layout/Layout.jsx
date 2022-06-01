import { Outlet } from 'react-router-dom';
import Header from 'components/Common/Header/Header';
import { getUserApi } from 'api/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'reducers/user/user.actions';

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await getUserApi();
      dispatch(setUserInfo({ ...userInfo }));
    }

    getUserInfo();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
