import TermsStep from './Steps/TermsStep/TermsStep';
import FillInfoStep from './Steps/FillInfoStep/FillInfoStep';
import ResultStep from './Steps/ResultStep/ResultStep';
import { SIGNUP_STEPS } from '../../constants/paths';
import { useOutletContext } from 'react-router-dom';

function SignupStep() {
  const { stepId } = useOutletContext<{
    stepId: string;
    goNextStep: () => void;
  }>();

  switch (Number(stepId)) {
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
