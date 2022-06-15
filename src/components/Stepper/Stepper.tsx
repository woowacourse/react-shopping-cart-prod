import * as S from 'components/Stepper/Stepper.styled';
import * as T from 'components/Stepper/Stepper.types';

function Stepper({ steps, currentStepId }: T.Props) {
  const isCurrentStep = (id: number) => id === currentStepId;

  return (
    <S.StepList>
      {steps.map(({ title, id }) => (
        <S.StepItem key={id}>
          <S.Circle selected={isCurrentStep(id)}>{id}</S.Circle>
          <S.StepTitle selected={isCurrentStep(id)}>{title}</S.StepTitle>
        </S.StepItem>
      ))}
    </S.StepList>
  );
}

export default Stepper;
