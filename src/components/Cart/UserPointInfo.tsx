import styled from 'styled-components';
import usePoint from '../../hooks/usePoint';
import useEstimatedPayment from '../../hooks/useEstimatedPayment';
import { XS } from '../../constants/screenSizes';

const UserPointInfo = () => {
  const { userPoint, minUsagePoint, handleUserUsedPointUpdate } = usePoint();
  const { totalProductPrice } = useEstimatedPayment(userPoint);
  const isInputDisabled = userPoint < minUsagePoint;

  const handleUsedPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbersRegex = /[^0-9]/g;
    const userInputValue = e.target.value;
    const filteredInputValue = userInputValue.replace(onlyNumbersRegex, '');
    const userInputPoint = Number(filteredInputValue);

    if (userInputPoint > userPoint) {
      alert('사용할 수 있는 포인트를 초과하였습니다.');
      e.target.value = '';
      return;
    }

    if (userInputPoint > totalProductPrice) {
      alert('상품 금액을 초과하는 포인트 사용은 불가능합니다.');
      e.target.value = '';
      return;
    }

    e.target.value = filteredInputValue;
  };

  const handleUsedPointOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const userInputPoint = e.target.valueAsNumber;
    handleUserUsedPointUpdate(userInputPoint);

    if (userInputPoint < 3000) {
      alert('포인트는 3000원 이상 사용할 수 있습니다.');
      e.target.value = '';
      return;
    }
  };

  return (
    <UserPointInfoContainer>
      <UserPointInfoTitle>포인트</UserPointInfoTitle>
      <PointContainer>
        <HeldPointWrapper>
          <HeldPointTitle>보유 포인트</HeldPointTitle>
          <HeldPointAmount>{userPoint.toLocaleString('KR')}원</HeldPointAmount>
        </HeldPointWrapper>
        <UsedPointWrapper>
          <label>사용 포인트</label>
          <PointInput
            onChange={handleUsedPoint}
            disabled={isInputDisabled}
            onBlur={handleUsedPointOnBlur}
          />
          <span>원</span>
        </UsedPointWrapper>
        <UsedPointGuide>
          🔔 포인트는 {minUsagePoint.toLocaleString('KR')}원 이상부터 사용
          가능합니다
        </UsedPointGuide>
      </PointContainer>
    </UserPointInfoContainer>
  );
};

const UserPointInfoContainer = styled.div`
  width: 448px;
  height: 220px;
  margin-bottom: 40px;

  @media (max-width: ${XS}) {
    width: 330px;
  }
`;

const UserPointInfoTitle = styled.div`
  height: 71px;
  padding: 25px 0 20px 30px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};
  font-size: 20px;
`;

const PointContainer = styled.div`
  padding: 10px 0 20px 30px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const HeldPointWrapper = styled.div`
  display: flex;
  margin: 30px 0;
`;

const HeldPointTitle = styled.p`
  margin-right: 30px;
`;

const HeldPointAmount = styled.p`
  width: 180px;
  text-align: right;
`;

const UsedPointWrapper = styled.div`
  display: flex;
`;

const PointInput = styled.input`
  margin-left: 30px;
  padding: 0 5px;
  width: 165px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  outline: none;
  font-size: 18px;
  font-weight: 600;
  text-align: right;

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
  }
`;

const UsedPointGuide = styled.p`
  margin: 10px 0 0 5px;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray200};
`;

export default UserPointInfo;
