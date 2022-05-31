import * as S from './Stepper.styled';
import * as T from './Stepper.types';

function Stepper({ stepList }: T.Props) {
  const isSelected = (index: number) => index === 0;

  return (
    <S.StepList>
      {stepList.map(({ urlParamId, title }, index) => (
        <S.StepItem key={urlParamId}>
          <S.Circle selected={isSelected(index)}>{index + 1}</S.Circle>
          <S.StepTitle selected={isSelected(index)}>{title}</S.StepTitle>
        </S.StepItem>
      ))}
    </S.StepList>
  );
}

export default Stepper;
