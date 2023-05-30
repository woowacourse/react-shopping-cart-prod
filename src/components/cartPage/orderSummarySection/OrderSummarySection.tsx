import styled from 'styled-components';
import { getCommaAddedNumber } from '../../../utils/number';
import { useRecoilState, useRecoilValue } from 'recoil';
import { priceSummaryState } from '../../../recoil/selectors/priceSummarySelector';
import { selectedCartIdListState } from '../../../recoil/atoms/cartAtom';
import { pointState } from '../../../recoil/atoms/pointAtom';
import { ChangeEvent, useEffect, useState } from 'react';

export const OrderSummarySection = () => {
  const { totalProductPrice, deliveryPrice, totalPrice, pointToAdd } =
    useRecoilValue(priceSummaryState);

  const [point, setPoint] = useRecoilState(pointState);
  const [viewPoint, setViewPoint] = useState(0);

  const checkedProduct = useRecoilValue(selectedCartIdListState);

  useEffect(() => {
    if (checkedProduct.length === 0) {
      setViewPoint(0);
    }
  }, [checkedProduct.length]);

  const handleOrderButton = () => {
    localStorage.setItem('pointKey', JSON.stringify({ point: pointToAdd }));
  };

  const handlePointChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (checkedProduct.length === 0) return;
    setViewPoint(Number(e.target.value));
  };

  const handleUsingAllPoint = () => {
    if (checkedProduct.length === 0) return;
    setViewPoint(point.point);
  };

  return (
    <Style.Container>
      <Style.Header>
        <Style.HeaderTitle>결제 예상 금액</Style.HeaderTitle>
      </Style.Header>
      <Style.Content>
        <Style.TotalPriceSummary>
          <Style.Caption>총 상품 금액</Style.Caption>
          <Style.Caption>
            {getCommaAddedNumber(totalProductPrice)}원
          </Style.Caption>
        </Style.TotalPriceSummary>
        <Style.TotalDeliveryPriceSummary>
          <Style.Caption>총 배송비</Style.Caption>
          <Style.Caption>{getCommaAddedNumber(deliveryPrice)}원</Style.Caption>
        </Style.TotalDeliveryPriceSummary>
        <Style.PointInputContainer>
          <Style.Caption>적립금 사용</Style.Caption>
          <Style.PointInput
            type="text"
            value={viewPoint}
            placeholder={point.point ? `${point.point}` : '0'}
            onChange={handlePointChange}
          />
          <Style.UsingAllPoint onClick={handleUsingAllPoint}>
            전액 사용
          </Style.UsingAllPoint>
        </Style.PointInputContainer>
        <Style.AvailablePoint>
          사용 가능 적립금 {point.point ? getCommaAddedNumber(point.point) : 0}
          원
        </Style.AvailablePoint>
        <Style.TotalOrderPriceSummary>
          <Style.Caption>할인 합계</Style.Caption>
          <Style.Caption>
            {viewPoint ? `-${getCommaAddedNumber(viewPoint)}원` : `0원`}
          </Style.Caption>
        </Style.TotalOrderPriceSummary>
        <Style.TotalOrderPriceSummary>
          <Style.Caption>총 주문 금액</Style.Caption>
          <Style.Caption>
            {getCommaAddedNumber(
              checkedProduct.length ? totalPrice - viewPoint : 0
            )}
            원
          </Style.Caption>
        </Style.TotalOrderPriceSummary>
        <Style.PointToAdd>
          <Style.Caption>적립 예정 금액</Style.Caption>
          <Style.Caption>{getCommaAddedNumber(pointToAdd)}원</Style.Caption>
        </Style.PointToAdd>
        <Style.OrderButton onClick={handleOrderButton}>
          주문하기
        </Style.OrderButton>
      </Style.Content>
    </Style.Container>
  );
};

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Style = {
  Container: styled.section`
    width: 348px;
    height: 100%;
    margin-top: 49px;

    border: 1px solid #dddddd;
    position: sticky;
    top: 120px;
    border-radius: 6px;

    @media (max-width: 1080px) {
      width: 100%;
    }
  `,
  Header: styled.div`
    width: 348px;
    height: 81px;

    padding: 30px 20px;

    border-bottom: 3px solid #dddddd;
    @media (max-width: 1080px) {
      width: 100%;
    }
  `,
  HeaderTitle: styled.h2`
    font-size: 24px;
  `,
  Content: styled.div`
    width: 348px;

    display: flex;
    flex-direction: column;
    align-items: end;

    padding: 34px 30px 0;
    @media (max-width: 1080px) {
      width: 100%;
    }
  `,
  TotalPriceSummary: styled(StyledSummary)`
    margin-bottom: 19px;
  `,
  TotalDeliveryPriceSummary: styled(StyledSummary)`
    margin-bottom: 30px;
  `,
  PointInputContainer: styled(StyledSummary)`
    margin-bottom: 10px;
  `,
  PointInput: styled.input`
    border-bottom: 1px solid #333333;
    text-align: end;
    width: 120px;
    font-size: 14px;
  `,
  UsingAllPoint: styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    font-size: 12px;
    border: 1px solid #333333;
    text-align: center;
    cursor: pointer;
  `,
  AvailablePoint: styled.div`
    font-size: 14px;
    margin-bottom: 20px;
  `,
  TotalOrderPriceSummary: styled(StyledSummary)`
    margin-bottom: 20px;
  `,
  Caption: styled.span`
    font-size: 18px;
  `,
  OrderButton: styled.button`
    width: 100%;
    height: 53px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #333333;
    font-size: 24px;
    color: #ffffff;
    font-family: var(--baemin-font);

    padding: 12px;
    margin-bottom: 20px;
    border-radius: 8px;
  `,

  PointToAdd: styled(StyledSummary)`
    margin-bottom: 45px;
  `,
};
