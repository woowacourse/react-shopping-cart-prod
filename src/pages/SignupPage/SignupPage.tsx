import { useParams } from 'react-router-dom';

import * as S from 'pages/SignupPage/SignupPage.styled';
import FillInfoStep from 'pages/SignupPage/Steps/FillInfoStep/FillInfoStep';
import ResultStep from 'pages/SignupPage/Steps/ResultStep/ResultStep';
import TermsStep from 'pages/SignupPage/Steps/TermsStep/TermsStep';

import DivideLine from 'components/DivideLine/DivideLine';
import Stepper from 'components/Stepper/Stepper';

import { SIGNUP_STEPS } from 'constants/paths';

function SignupPage() {
  const { stepId } = useParams();
  const step = Number(stepId);

  return (
    <S.PageBox>
      <Stepper steps={SIGNUP_STEPS} currentStepId={Number(stepId)} />
      <DivideLine color="gray" thickness="thin" />
      {step === 1 && <TermsStep />}
      {step === 2 && <FillInfoStep />}
      {step === 3 && <ResultStep />}
    </S.PageBox>
  );
}

export default SignupPage;
