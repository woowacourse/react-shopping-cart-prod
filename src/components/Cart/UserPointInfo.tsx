import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { hostNameAtom } from '../../recoil/hostData';
import { api } from '../../apis/cartProducts';

interface UserPointInfoProps {
  onUserUsedPointUpdate: (value: number) => void;
}

const UserPointInfo = ({ onUserUsedPointUpdate }: UserPointInfoProps) => {
  const hostName = useRecoilValue(hostNameAtom);
  const [userPoint, setUserPoint] = useState(0);
  const [minUsagePoints, setMinUsagePoints] = useState(0);
  const isInputDisabled = userPoint < minUsagePoints;

  const handleUsedPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbersRegex = /[^0-9]/g;
    const userInputValue = e.target.value;
    const filteredInputValue = userInputValue.replace(onlyNumbersRegex, '');
    const userInputPoint = Number(filteredInputValue);

    if (userInputPoint > userPoint) {
      alert('사용할 수 있는 포인트를 초과하였습니다.');
      e.target.value = '';
    } else {
      e.target.value = filteredInputValue;
    }
  };

  const handleUsedPointOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const onlyNumbersRegex = /[^0-9]/g;
    const userInputValue = e.target.value;
    const filteredInputValue = userInputValue.replace(onlyNumbersRegex, '');
    const userInputPoint = Number(filteredInputValue);
    onUserUsedPointUpdate(userInputPoint);
  };

  useEffect(() => {
    const fetchUserPoints = async () => {
      const response = await await api(hostName).then((apiInstance) => {
        return apiInstance.fetchCartProducts();
      });
      setUserPoint(response.userPoint);
      setMinUsagePoints(response.minUsagePoints);
    };
    fetchUserPoints();
  }, []);

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
          🔔 포인트는 {minUsagePoints.toLocaleString('KR')}원 이상부터 사용
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

  @media (max-width: 420px) {
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
