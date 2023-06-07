import { styled } from 'styled-components';
import { pointSelector } from '../../store/PointSelector';
import { useRecoilState, useRecoilValue } from 'recoil';
import { inputPointValueState } from '../../store/InputPointValueState';
import { DELIVERY_FEE } from '../../constants';

type Props = {
  totalPrice: number;
};

const Point = ({ totalPrice }: Props) => {
  const point = useRecoilValue(pointSelector);
  const [inputPointValue, setInputPointValue] = useRecoilState(inputPointValueState);

  const holdPoint = point - Number(inputPointValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim() !== '' ? Number(event.target.value) : 0;

    if (totalPrice + DELIVERY_FEE < value) {
      alert('총 주문금액보다 넘게 포인트를 사용할 수는 없습니다.');
      return;
    }

    setInputPointValue(event.target.value);
  };

  return (
    <S.Wrapper>
      <S.Title>Point</S.Title>
      <S.PointWrapper>
        <S.HoldPoint>
          {holdPoint ? `보유: ${holdPoint.toLocaleString()}포인트` : <S.Spinner />}
        </S.HoldPoint>
        <S.PointField type="number" max={point} value={inputPointValue} onChange={handleChange} />
      </S.PointWrapper>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.section`
    display: flex;
  `,
  Title: styled.h4``,

  PointWrapper: styled.div`
    display: flex;
    align-items: center;
  `,

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

  Spinner: styled.div`
    margin-right: 20px;
    border: 4px solid var(--gray-color-300);
    border-top: 4px solid var(--mint-color);
    border-radius: 50%;
    width: 15px;
    height: 15px;
    animation: spin 1s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
};

export default Point;
