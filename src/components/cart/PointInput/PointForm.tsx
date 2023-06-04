import { ChangeEventHandler, MouseEventHandler } from 'react';
import { S } from './PointInput.styles';

type Props = {
  inputPoint: string;
  handlePointInputChange: ChangeEventHandler<HTMLInputElement>;
  handleToggleUseAllPoints: MouseEventHandler<HTMLButtonElement>;
  totalPrice: number;
  hasPoint: number;
  useAllPoints: boolean;
};

const PointForm = ({
  inputPoint,
  handlePointInputChange,
  handleToggleUseAllPoints,
  totalPrice,
  hasPoint,
  useAllPoints,
}: Props) => {
  return (
    <section>
      <S.PointLabel>사용 포인트</S.PointLabel>
      <S.InputWrapper>
        {useAllPoints ? (
          <>
            {`${totalPrice < hasPoint ? totalPrice.toLocaleString() : hasPoint.toLocaleString()}`}
            <span>원</span>
            <S.CloseButton onClick={handleToggleUseAllPoints}>x</S.CloseButton>
          </>
        ) : (
          <>
            <S.Input
              value={inputPoint}
              type="text"
              placeholder="0"
              onChange={handlePointInputChange}
            />
            <span>원</span>
          </>
        )}
        <S.PointButton
          disabled={totalPrice === 0 || hasPoint === 0 || useAllPoints}
          onClick={handleToggleUseAllPoints}
        >
          전액사용
        </S.PointButton>
      </S.InputWrapper>
    </section>
  );
};

export default PointForm;
