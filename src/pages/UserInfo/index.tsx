import PageLayout from '../../components/PageLayout';
import Form from '../../components/@shared/Form';
import Input from '../../components/@shared/Input';

function UserInfo() {
  return (
    <PageLayout>
      <h1>회원 정보 수정</h1>
      <Form>
        <Input htmlFor="userinfo-id" label="아이디" disabled={true} />
        <Input type="password" htmlFor="userinfo-password" label="비밀번호" />
        <Input type="password" htmlFor="userinfo-password-confirm" label="비밀번호 확인" />
      </Form>
    </PageLayout>
  );
}

export default UserInfo;
