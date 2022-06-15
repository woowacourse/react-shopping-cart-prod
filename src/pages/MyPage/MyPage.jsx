import { shallowEqual, useSelector } from "react-redux";
import cn from "classnames";

import Divider from "@components/Divider";
import UserNameForm from "./components/UserNameForm";
import PasswordForm from "./components/PasswordForm";
import SecessionForm from "./components/SecessionForm";

import styles from "./MyPage.module";

function MyPage({ className }) {
  const user = useSelector((state) => state.user.data, shallowEqual);

  return (
    <div className="wrapper">
      <div className={cn(styles.myPage, className)}>
        <div className={styles.title}>마이페이지</div>
        <div className={styles.content}>
          <div>
            <div>이메일</div>
            <div className={styles.email}>{user.email}</div>
          </div>
          <Divider className="mt-40 mb-20" mini light />
          <UserNameForm />
          <Divider className="mt-40 mb-20" mini light />
          <PasswordForm />
          <Divider className="mt-40 mb-20" mini light />
          <SecessionForm />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
