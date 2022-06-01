import cn from "classnames";
import Button from "@shared/button/Button";
import LabeledInput from "@shared/input/labeled-input/LabeledInput";
import Divider from "@shared/divider/Divider";
import styles from "./my-page.module";

function MyPage({ className }) {
  return (
    <div className="wrapper">
      <div className={cn(styles.myPage, className)}>
        <div className={styles.title}>마이페이지</div>
        <div className={styles.content}>
          <div>
            <div>이메일</div>
            <div className={styles.email}>woowacourse@gmail.com</div>
          </div>
          <Divider className="mt-40 mb-20" mini light />
          <form>
            <LabeledInput
              label="이름"
              className="mb-16"
              id="username"
              type="username"
              placeholder="이름을 입력해주세요"
            />
            <Button variant="primary" size="md" block type="submit">
              이름 수정
            </Button>
          </form>
          <Divider className="mt-40 mb-20" mini light />
          <form>
            <LabeledInput
              label="기존 비밀번호"
              className="mb-16"
              id="old-password"
              type="password"
              name="old-password"
              placeholder="기존 비밀번호를 입력해주세요"
              value=""
            />
            <LabeledInput
              label="새 비밀번호"
              className="mb-16"
              id="new-password"
              type="password"
              name="new-password"
              placeholder="새 비밀번호를 입력해주세요"
              value=""
            />
            <LabeledInput
              label="새 비밀번호 확인"
              className="mb-16"
              id="confirm-new-password"
              type="password"
              name="confirm-new-password"
              placeholder="새 비밀번호를 입력해주세요"
              value=""
            />
            <Button variant="primary" size="md" block type="submit">
              비밀번호 수정
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
