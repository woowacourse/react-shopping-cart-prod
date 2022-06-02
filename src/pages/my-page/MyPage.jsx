import { shallowEqual, useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import Button from "@shared/button/Button";
import LabeledInput from "@shared/input/labeled-input/LabeledInput";
import Divider from "@shared/divider/Divider";
import createAction from "@redux/createAction";
import useForm from "../../hooks/useForm/useForm";
import updateUsername from "../../remote/userName";
import styles from "./my-page.module";
import ACTION_TYPE from "../../redux/actions";
import updateUserPassword from "../../remote/userPassword";
import LocalStorage from "../../storage/localStorage";
import requestDeleteUser from "../../remote/userSecession";

function MyPage({ className }) {
  const userNameForm = useForm();
  const passwordForm = useForm();
  const secessionForm = useForm();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user, shallowEqual);

  const handleUserNameFormSubmit = async ({ username }, errors) => {
    const newUserInfo = await updateUsername(username);
    dispatch(createAction(ACTION_TYPE.UPDATE_USER, newUserInfo));
  };

  const handlePasswordFormSubmit = async (data, errors) => {
    const [oldPW, newPW, newPWForConfirm] = [
      data["old-password"],
      data["new-password"],
      data["confirm-new-password"],
    ];
    if (!oldPW || !newPW || !newPWForConfirm) {
      alert("값을 입력해주세요");
      return;
    }
    if (newPW !== newPWForConfirm) {
      alert("새 비밀번호를 확인해 주세요");
      return;
    }
    const isOK = await updateUserPassword({
      oldPassword: oldPW,
      newPassword: newPW,
    });
    if (!isOK) {
      alert("기존 비밀번호를 확인해 주세요");
      return;
    }
    alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요");
    LocalStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const handleSecessionFormSubmit = async (data, errors) => {
    console.log("data : ", data);
    const result = window.confirm("정말 탈퇴 하시겠습니까?");
    if (!result) return;
    const password = data["password-for-secession"];
    if (!password) {
      alert("비밀번호를 입력해 주세요");
      return;
    }
    const isOK = await requestDeleteUser(password);
    if (!isOK) {
      alert("문제가 발생했습니다.");
      return;
    }
    alert("Good Bye!");
    LocalStorage.removeItem("accessToken");
    window.location.href = "/";
  };

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
          <form onSubmit={userNameForm.onSubmit(handleUserNameFormSubmit)}>
            <LabeledInput
              label="이름"
              className="mb-16"
              id="username"
              type="username"
              placeholder="이름을 입력해주세요"
              defaultValue={`${user.username}`}
              {...userNameForm.register("username")}
            />
            <Button variant="primary" size="md" block type="submit">
              이름 수정
            </Button>
          </form>
          <Divider className="mt-40 mb-20" mini light />
          <form onSubmit={passwordForm.onSubmit(handlePasswordFormSubmit)}>
            <LabeledInput
              label="기존 비밀번호"
              className="mb-16"
              id="old-password"
              type="password"
              name="old-password"
              placeholder="기존 비밀번호를 입력해주세요"
              {...passwordForm.register("old-password")}
            />
            <LabeledInput
              label="새 비밀번호"
              className="mb-16"
              id="new-password"
              type="password"
              name="new-password"
              placeholder="새 비밀번호를 입력해주세요"
              {...passwordForm.register("new-password")}
            />
            <LabeledInput
              label="새 비밀번호 확인"
              className="mb-16"
              id="confirm-new-password"
              type="password"
              name="confirm-new-password"
              placeholder="새 비밀번호를 입력해주세요"
              {...passwordForm.register("confirm-new-password")}
            />
            <Button variant="primary" size="md" block type="submit">
              비밀번호 수정
            </Button>
          </form>
          <Divider className="mt-40 mb-20" mini light />
          <form onSubmit={secessionForm.onSubmit(handleSecessionFormSubmit)}>
            <LabeledInput
              label="회원탈퇴"
              className="mb-16"
              id="password-for-secession"
              type="password"
              name="password-for-secession"
              placeholder="비밀번호를 입력해주세요"
              {...secessionForm.register("password-for-secession")}
            />
            <Button variant="primary" size="md" block type="submit">
              회원탈퇴
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
