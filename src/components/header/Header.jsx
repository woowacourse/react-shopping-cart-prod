import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import Logo from "@assets/images/logo.svg";
import { getUser } from "@redux/reducers/user-reducer/userThunks";
import LocalStorage from "@storage/localStorage";
import styles from "./header.module";

function Header({ className }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const { isLoading, isError } = useSelector(
    (state) => state.user.query.getUser
  );

  const handleLogoutBtnClick = () => {
    LocalStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  useEffect(() => {
    const accessToken = LocalStorage.getItem("accessToken");
    accessToken && dispatch(getUser());
  }, []);

  if (isError) return <div>에러가 발생했습니다!</div>;

  const loggedInMenuItems = (
    <>
      <li>
        <Link to="/cart">장바구니</Link>
      </li>
      <li>
        <Link to="/my-page">마이페이지</Link>
      </li>
      <li>
        <button type="button" onClick={handleLogoutBtnClick}>
          로그아웃
        </button>
      </li>
    </>
  );

  const loginMneuItems = (
    <li>
      <Link to="/login">로그인</Link>
    </li>
  );

  const menuItems = user.isLoggedIn ? loggedInMenuItems : loginMneuItems;

  return (
    <div className={cn(styles.header, className)}>
      <div className="flex wrapper place-content-between">
        <Link to="/" className={styles.siteLogo}>
          <div className={styles.logo}>
            <Logo
              width="auto"
              height="auto"
              viewBox="0 0 50 44"
              preserveAspectRatio="xMidYMid meet"
            />
          </div>
          <span className={styles.title}>WOOWA SHOP</span>
        </Link>
        <div className={cn(styles.menu)}>
          <ul className={styles.ul}>{isLoading ? <div /> : menuItems}</ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
