import { shallowEqual, useSelector } from "react-redux";
import cn from "classnames";
import Divider from "@shared/divider/Divider";
import styles from "./my-page.module";
import UserNameForm from "./components/username-form/UserNameForm";
import PasswordForm from "./components/password-form/PasswordForm";
import SecessionForm from "./components/secession-form/SecessionForm";

function MyPage({ className }) {
  const user = useSelector((state) => state.user, shallowEqual);

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
