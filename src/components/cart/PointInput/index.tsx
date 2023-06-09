import { useRecoilState, useRecoilValue } from 'recoil';
import { S } from './PointInput.styles';
import pointState from '../../../store/PointState';
import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import memberState from '../../../store/MemberState';
import { validatePointInput } from '../../../utils/validatePointInput';
import PointInfo from './PointInfo';
import PointForm from './PointForm';

type Props = {
  totalPrice: number;
};

const PointInput = ({ totalPrice }: Props) => {
  const [usedPoint, setUsedPoint] = useRecoilState(pointState);
  const member = useRecoilValue(memberState);
  const [useAllPoints, setUseAllPoints] = useState(false);

  const handleToggleUseAllPoints: MouseEventHandler<HTMLButtonElement> = () => {
    setUseAllPoints((prev) => !prev);
    !useAllPoints ? setUsedPoint(Math.min(totalPrice, member.point)) : setUsedPoint(0);
  };

  const handlePointInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (!validatePointInput(value, totalPrice, member.point)) return;

    const parsedValue = value.replace(/[^0-9]/g, '');
    setUsedPoint(Number(parsedValue));
  };

  return (
    <S.Wrapper>
      <PointInfo memberPoint={member.point} />
      <PointForm
        inputPoint={usedPoint.toLocaleString()}
        handlePointInputChange={handlePointInputChange}
        handleToggleUseAllPoints={handleToggleUseAllPoints}
        useAllPoints={useAllPoints}
        totalPrice={totalPrice}
        hasPoint={member.point}
      />
    </S.Wrapper>
  );
};

export default PointInput;
