import * as S from 'components/Stepper/Stepper.styled';
import * as T from 'components/Stepper/Stepper.types';

function Stepper({ stepList, currentStepId }: T.Props) {
  const isCurrentStep = (id: T.Step['id']) => id === currentStepId;

  return (
    <S.StepList>
      {stepList.map(({ id, title }, index) => (
        <S.StepItem key={id}>
          <S.Circle selected={isCurrentStep(id)}>{index + 1}</S.Circle>
          <S.StepTitle selected={isCurrentStep(id)}>{title}</S.StepTitle>
        </S.StepItem>
      ))}
    </S.StepList>
  );
}

export default Stepper;
