import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getUser } from "@redux/reducers/user/userThunks";
import USER_ACTION_TYPE from "@redux/reducers/user/userActions";
import createAction from "@redux/utils/createAction";

import LocalStorage from "@utils/LocalStorage";

import styles from "./HeaderMenus.module";

function HeaderMenus() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.data);

  const handleLogoutButtonClick = () => {
    LocalStorage.removeItem("accessToken");
    dispatch(createAction(USER_ACTION_TYPE.LOGOUT));
    navigate(0);
  };

  useEffect(() => {
    LocalStorage.getItem("accessToken") && dispatch(getUser());
  }, []);

  return (
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
            <button type="button" onClick={handleLogoutButtonClick}>
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
  );
}

export default HeaderMenus;
