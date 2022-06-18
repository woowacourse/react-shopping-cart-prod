import TermsStep from 'pages/SignupPage/Steps/TermsStep/TermsStep';
import FillInfoStep from 'pages/SignupPage/Steps/FillInfoStep/FillInfoStep';
import ResultStep from 'pages/SignupPage/Steps/ResultStep/ResultStep';
import { SIGNUP_STEPS } from 'constants/paths';
import { useOutletContext } from 'react-router-dom';
import Auth from 'components/Auth/Auth';

function SignupStep() {
  const { stepId } = useOutletContext<{
    stepId: string;
    goNextStep: () => void;
  }>();

  switch (Number(stepId)) {
    case SIGNUP_STEPS.TERMS.id:
      return (
        <Auth option={false}>
          <TermsStep />
        </Auth>
      );
    case SIGNUP_STEPS.FILL_INFO.id:
      return (
        <Auth option={false}>
          <FillInfoStep />
        </Auth>
      );
    case SIGNUP_STEPS.RESULT.id:
      return (
        <Auth>
          <ResultStep />
        </Auth>
      );
    default:
      return null;
  }
}

export default SignupStep;
