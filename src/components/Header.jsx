import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import Logo from "@assets/images/logo.svg";
import HeaderMenus from "./HeaderMenus";

import styles from "./Header.module";

function Header({ className }) {
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
          <HeaderMenus />
        </div>
      </div>
    </div>
  );
}

export default Header;
