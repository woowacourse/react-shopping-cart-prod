import { useRecoilState } from 'recoil';
import { S } from './PointInput.styles';
import PointState from '../../../store/PointState';
import { MouseEventHandler, useState } from 'react';

const PointInput = () => {
  const [point, setPoint] = useRecoilState(PointState);
  const [useAllPoint, setUseAllPoint] = useState(false);

  const handleToggleUseAllPoint: MouseEventHandler<HTMLButtonElement> = () => {
    setUseAllPoint((prev) => !prev);
  };

  // 토글이 아닌 disable 형태로 변환하기
  return (
    <S.Wrapper>
      <S.PointLabel>보유 포인트</S.PointLabel>
      <span>{`${point.toLocaleString()}원`}</span>
      <S.PointLabel>사용 포인트</S.PointLabel>
      <S.InputWrapper>
        {useAllPoint ? `${point.toLocaleString()}원` : <S.Input type="text" placeholder="0원" />}
        <S.PointButton onClick={handleToggleUseAllPoint}>전액사용</S.PointButton>
      </S.InputWrapper>
    </S.Wrapper>
  );
};

export default PointInput;
