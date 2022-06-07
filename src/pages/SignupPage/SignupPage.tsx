import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import DivideLine from '../../components/DivideLine/DivideLine';
import Stepper from '../../components/Stepper/Stepper';
import { SIGNUP_STEPS_LIST, SIGNUP_STEPS } from '../../constants/paths';
import * as S from './SignupPage.styled';

function SignupPage() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const [currentStepId, setCurrentStepId] = useState(1);

  useEffect(() => {
    if (
      !stepId ||
      !SIGNUP_STEPS_LIST.map((step) => step.id).includes(Number(stepId))
    ) {
      navigate('/signin/1');
    }

    if (currentStepId < Number(stepId)) {
      navigate(`/signup/${currentStepId}`);
    }
  }, [stepId, currentStepId, navigate]);

  const goNextStep = () => {
    if (currentStepId === Object.keys(SIGNUP_STEPS).length) {
      navigate('/');
    }

    navigate(`/signup/${Number(stepId) + 1}`);
    setCurrentStepId((prev) => Number(stepId) + 1);
  };

  if (
    !stepId ||
    !SIGNUP_STEPS_LIST.map((step) => step.id).includes(Number(stepId))
  ) {
    return null;
  }

  return (
    <S.PageBox>
      <Stepper stepList={SIGNUP_STEPS_LIST} stepId={Number(stepId)} />
      <DivideLine color="gray" thickness="thin" />
      <Outlet context={{ stepId, goNextStep }} />
    </S.PageBox>
  );
}

export default SignupPage;
