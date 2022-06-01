import cn from "classnames";
import Logo from "@assets/images/logo.svg";
import styles from "@shared/header/header.module";
import { Link } from "react-router-dom";

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
          <ul className={styles.ul}>
            <li>
              <Link to="/cart">장바구니</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
