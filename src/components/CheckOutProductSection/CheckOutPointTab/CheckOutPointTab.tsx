import styled from 'styled-components';
import Box from 'components/@common/Box';
import {
  useCheckOutPointCostActionsContext,
  useCheckOutPointCostValueContext,
} from 'hooks/useContext/useCheckOutPointCostContext';
import useFetch from 'hooks/useFetch';
import { getUserOwnPoints } from 'apis/points';
import { useRecoilValue } from 'recoil';
import { checkedCartProductsTotalPriceState } from 'state/cartProducts';
import { BASE_SHIPPING_FEE, SHIPPING_FEE_THRESHOLD } from 'constants/policy';
import reFetchIcon from 'assets/refresh-icon.svg';

const CheckOutPointTab = () => {
  const { data: userOwnPoints, isLoading, errorState, fetchData } = useFetch<number>(getUserOwnPoints);
  const { pointCost } = useCheckOutPointCostValueContext();
  const { allInPoint, changePointCost } = useCheckOutPointCostActionsContext();
  const cartTotalPrice = useRecoilValue(checkedCartProductsTotalPriceState);
  const shippingFee = cartTotalPrice < SHIPPING_FEE_THRESHOLD ? BASE_SHIPPING_FEE : 0;
  const paymentAmount = cartTotalPrice + shippingFee;

  const userOwnPointsText = isLoading
    ? '포인트 로딩중입니다...'
    : errorState?.isError
    ? '포인트 정보를 불러오지 못했어요'
    : `${userOwnPoints?.toLocaleString('ko-KR') ?? 0}P`;

  const handleChangePointCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePointCost(e, paymentAmount, userOwnPoints ?? 0);
  };

  const handleAllInPoint = () => {
    allInPoint(paymentAmount, userOwnPoints ?? 0);
  };

  return (
    <Box
      sizing={{ width: '100%' }}
      flex={{ flexDirection: 'column', align: 'flex-start', justify: 'flex-start', gap: '20px' }}
    >
      <TitleBox sizing={{ width: '100%', height: '60px' }} flex={{ justify: 'flex-start' }}>
        <Title>포인트</Title>
      </TitleBox>
      <Box sizing={{ width: '100%' }} flex={{ justify: 'flex-start', gap: '10px' }}>
        <PointInput type="tel" value={pointCost} onChange={handleChangePointCost} pattern="\d*" />
        <PointAllInButton onClick={handleAllInPoint}>전액사용</PointAllInButton>
      </Box>
      <Box>
        사용 가능 포인트
        <AvailablePoints>{userOwnPointsText}</AvailablePoints>
        {errorState?.isError && (
          <PointReFetchButton onClick={fetchData}>
            <ReFetchIcon src={reFetchIcon} alt="다시 조회하기" />
          </PointReFetchButton>
        )}
      </Box>
    </Box>
  );
};

export default CheckOutPointTab;

const TitleBox = styled(Box)`
  border-bottom: solid 1px var(--color-grayscale-200);
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  text-align: left;
`;

const PointInput = styled.input`
  width: 200px;
  height: 40px;
  padding: 10px 14px;
  border: 1px solid var(--color-grayscale-200);
  border-radius: 4px;
  font-size: 16px;
  outline: 0;

  :hover {
    background-color: var(--color-grayscale-100);
  }

  :focus {
    box-shadow: 0 0 0 1px var(--color-primary);
    background-color: var(--color-pure-white);
  }
`;

const PointAllInButton = styled.button`
  outline: 0;
  border: 1px solid var(--color-primary-tone-down);
  border-radius: 4px;
  padding: 10px 14px;
  background-color: var(--color-pure-white);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary-tone-down);
  cursor: pointer;

  :hover {
    background-color: #dbfeff;
  }
`;

const AvailablePoints = styled.span`
  margin-left: 6px;
  font-size: 16px;
  color: var(--color-primary-tone-down);
`;

const PointReFetchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  margin-left: 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ReFetchIcon = styled.img`
  width: 20px;
  height: 20px;

  transition: transform 100ms ease;

  :hover {
    transform: scale(1.1);
  }
`;
