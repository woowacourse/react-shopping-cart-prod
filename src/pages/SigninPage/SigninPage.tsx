import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import * as S from './SigninPage.styled';

function SigninPage() {
  return (
    <S.PageBox>
      <S.Title>로그인</S.Title>
      <S.Form>
        <S.Section>
          <Input type="email" placeholder="이메일을 입력해주세요." />
          <Input type="password" placeholder="비밀번호를 입력해주세요." />
        </S.Section>
        <S.Section>
          <Button type="submit">로그인</Button>
          <Button type="button" color="white">
            회원가입
          </Button>
        </S.Section>
      </S.Form>
    </S.PageBox>
  );
}

export default SigninPage;
