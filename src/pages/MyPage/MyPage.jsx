import { shallowEqual, useSelector } from "react-redux";
import cn from "classnames";

import useAuthGuard from "@hooks/useAuthGuard";

import Divider from "@components/Divider";

import { useEffect } from "react";
import UserNameForm from "./components/UserNameForm";
import PasswordForm from "./components/PasswordForm";
import WithdrawalForm from "./components/WithdrawalForm";

import styles from "./MyPage.module";
import { USER_ACCESS_POLICY } from "../../constants";

function MyPage({ className }) {
  const checkUserAccessPolicy = useAuthGuard({
    policy: USER_ACCESS_POLICY.ONLY_LOGGED_IN,
  });

  const user = useSelector((state) => state.userReducer.data, shallowEqual);

  useEffect(() => {
    checkUserAccessPolicy();
  }, [checkUserAccessPolicy]);

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
          <WithdrawalForm />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
