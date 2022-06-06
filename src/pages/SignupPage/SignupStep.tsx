import { useOutletContext } from 'react-router-dom';

import FillInfoStep from 'pages/SignupPage/Steps/FillInfoStep/FillInfoStep';
import ResultStep from 'pages/SignupPage/Steps/ResultStep/ResultStep';
import TermsStep from 'pages/SignupPage/Steps/TermsStep/TermsStep';

import { SIGNUP_STEPS } from 'constants/paths';

function SignupStep() {
  const { currentStepId } = useOutletContext<{
    currentStepId: number;
    goNextStep: () => void;
  }>();

  switch (Number(currentStepId)) {
    case SIGNUP_STEPS.TERMS.id:
      return <TermsStep />;
    case SIGNUP_STEPS.FILL_INFO.id:
      return <FillInfoStep />;
    case SIGNUP_STEPS.RESULT.id:
      return <ResultStep />;
    default:
      return null;
  }
}

export default SignupStep;
