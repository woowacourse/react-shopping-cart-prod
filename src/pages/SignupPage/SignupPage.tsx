import { ReactComponent as ZzangguLogo } from 'assets/Zzanggu.svg';
import SignupForm from 'components/SignupForm/SignupForm';

import * as S from './SignupPage.styled';

function SignupPage() {
  return (
    <S.Page>
      <S.SignupContainer>
        <header>
          <S.Title>회원가입</S.Title>
          <ZzangguLogo width={200} height={180} />
        </header>
        <SignupForm />
      </S.SignupContainer>
    </S.Page>
  );
}

export default SignupPage;
