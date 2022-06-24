import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import cn from "classnames";

import LocalStorage from "@utils/LocalStorage";
import Logo from "@assets/images/logo.svg";
import styles from "./Header.module";
import { getUser } from "../redux/reducers/user/userThunks";
import USER_ACTION_TYPE from "../redux/reducers/user/userActions";
import createAction from "../redux/utils/createAction";

function Header({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.data);

  const handleLogoutBtnClick = () => {
    LocalStorage.removeItem("accessToken");
    dispatch(createAction(USER_ACTION_TYPE.LOGOUT));
    navigate(0);
  };

  useEffect(() => {
    LocalStorage.getItem("accessToken") && dispatch(getUser());
  }, []);

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
          <ul className={styles.ul}>
            {user.isLoggedIn ? (
              <>
                <li>
                  <Link to="/cart">장바구니</Link>
                </li>
                <li>
                  <Link to="/order-list">주문목록</Link>
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
            ) : (
              <li>
                <Link to="/login">로그인</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
