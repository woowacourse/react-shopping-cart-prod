/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { S } from './PointInput.styles';
import pointState from '../../../store/PointState';
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import memberState from '../../../store/MemberState';
import { validatePointInput } from '../../../utils/validatePointInput';
import PointInfo from './PointInfo';
import PointForm from './PointForm';

type Props = {
  totalPrice: number;
};

const PointInput = ({ totalPrice }: Props) => {
  const setUsedPoint = useSetRecoilState(pointState);
  const member = useRecoilValue(memberState);
  const [useAllPoints, setUseAllPoints] = useState(false);
  const [inputPoint, setInputPoint] = useState('');

  const handleToggleUseAllPoints: MouseEventHandler<HTMLButtonElement> = () => {
    setUseAllPoints((prev) => !prev);
    !useAllPoints ? setInputPoint(String(Math.min(totalPrice, member.point))) : setInputPoint('');
  };

  const handlePointInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (!validatePointInput(value, totalPrice, member.point)) return;

    const parsedValue = value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거 후 숫자로 변환
    setInputPoint(parsedValue);
  };

  useEffect(() => {
    setUsedPoint(Number(inputPoint));
  }, [inputPoint]);

  return (
    <S.Wrapper>
      <PointInfo memberPoint={member.point} />
      <PointForm
        inputPoint={Number(inputPoint).toLocaleString()}
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
