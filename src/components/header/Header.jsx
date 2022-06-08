import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import Logo from "@assets/images/logo.svg";
import { Link } from "react-router-dom";
import styles from "./header.module";
import LocalStorage from "../../storage/localStorage";

function Header({ className }) {
  const user = useSelector((state) => state.user.data);

  const handleLogoutBtnClick = () => {
    LocalStorage.removeItem("accessToken");
    window.location.href = "/";
  };

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
            <li>
              <Link to="/cart">장바구니</Link>
            </li>
            {user.isLoggedIn ? (
              <>
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
