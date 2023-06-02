import { styled } from 'styled-components';
import { pointState } from '../../store/PointState';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

const Point = () => {
  const point = useRecoilValue(pointState);
  const [inputValue, setInputValue] = useState('0');
  const [holdPoint, setHoldPoint] = useState(point);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim() !== '' ? Number(event.target.value) : 0;
    if (point - value < 0) {
      alert('보유한 포인트만 사용이 가능합니다.');
      return;
    }
    setInputValue(event.target.value);
    setHoldPoint(point - value);
  };

  return (
    <S.Wrapper>
      <S.Title>Point</S.Title>
      <S.PointWrapper>
        <S.HoldPoint>보유: {holdPoint.toLocaleString()}원</S.HoldPoint>
        <S.PointField type="number" max={point} value={inputValue} onChange={handleChange} />
      </S.PointWrapper>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.section`
    display: flex;
  `,
  Title: styled.h4``,

  PointWrapper: styled.div``,

  PointField: styled.input`
    width: 100px;
    border: 1px solid var(--gray-color);
    border-radius: 5px;
    padding-left: 3px;
  `,

  HoldPoint: styled.span`
    font-size: small;
    font-weight: 400;
    margin-right: 20px;
  `,
};

export default Point;
