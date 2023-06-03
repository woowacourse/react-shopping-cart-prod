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
          `${totalPrice < hasPoint ? totalPrice : hasPoint.toLocaleString()}원`
        ) : (
          <S.Input
            value={inputPoint}
            type="text"
            placeholder="0원"
            onChange={handlePointInputChange}
          />
        )}
        <S.PointButton
          disabled={totalPrice === 0 || hasPoint === 0}
          onClick={handleToggleUseAllPoints}
        >
          전액사용
        </S.PointButton>
      </S.InputWrapper>
    </section>
  );
};

export default PointForm;
