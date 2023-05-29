import { styled } from 'styled-components';
import Spacer from '../../common/Spacer/Spacer';
import { formatPrice } from '../../../utils/formatPrice';

const FREE_SHIPPING_PRICE = 30_000;
const SHIPPING_FEE = 3_000;

const calcTotalOrderPrice = (
  totalProductPrice: number,
  isFreeShipping: boolean,
) => {
  if (totalProductPrice <= 0) return 0;

  return isFreeShipping ? totalProductPrice : totalProductPrice + SHIPPING_FEE;
};

const CartTotal = ({ totalProductPrice }: { totalProductPrice: number }) => {
  const isFreeShipping = totalProductPrice >= FREE_SHIPPING_PRICE;

  return (
    <Container>
      <TitleWrapper>
        <Title>결제 금액</Title>
      </TitleWrapper>
      <Spacer height={34} />
      <Detail>
        <PriceWrapper>
          <dt>상품금액</dt>
          <dd>{formatPrice(totalProductPrice)}</dd>
        </PriceWrapper>
        <Spacer height={19} />
        <PriceWrapper>
          <dt>배송비</dt>
          {isFreeShipping ? (
            <OrderDetail>
              <dd>
                <s>{formatPrice(SHIPPING_FEE)}</s>
              </dd>
              <span>
                ({formatPrice(FREE_SHIPPING_PRICE)} 이상 주문시 무료배송)
              </span>
            </OrderDetail>
          ) : (
            <dd>{formatPrice(totalProductPrice > 0 ? SHIPPING_FEE : 0)}</dd>
          )}
        </PriceWrapper>
        <Spacer height={41} />
        <PriceWrapper>
          <dt>총 결제금액</dt>
          <TotalPrice isHighlight={totalProductPrice > 0}>
            {formatPrice(
              calcTotalOrderPrice(totalProductPrice, isFreeShipping),
            )}
          </TotalPrice>
        </PriceWrapper>
      </Detail>
      <Spacer height={43} />
      <OrderButton disabled={totalProductPrice === 0}>
        {totalProductPrice === 0
          ? '장바구니에 상품을 담아주세요.'
          : `주문하기 (총 ${formatPrice(
              calcTotalOrderPrice(totalProductPrice, isFreeShipping),
            )})`}
      </OrderButton>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  top: 130px;
  display: flex;
  flex-direction: column;
  width: 448px;
  height: 410px;
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 8px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 81px;
  border-bottom: 3px solid ${(props) => props.theme.color.gray300};
  padding: 0 30px;
`;

const Title = styled.h3`
  font-family: 'Noto Sans KR';
  font-size: 22px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0.5px;
`;

const Detail = styled.dl`
  display: flex;
  flex-direction: column;
  padding: 0 30px;

  & > div:last-child > * {
    font-size: 20px;
    font-weight: 700;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > dt,
  & > dd {
    font-family: 'Noto Sans KR';
    font-size: 18px;
    line-height: 27px;
    letter-spacing: 0.5px;
  }
`;

const TotalPrice = styled.dd<{ isHighlight: boolean }>`
  color: ${(props) => props.isHighlight && props.theme.color.primary};
`;

const OrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;

  & > span {
    font-weight: 600;
  }
`;

const OrderButton = styled.button`
  width: 388px;
  height: 73px;
  margin: 0 auto;
  background: ${(props) => props.theme.color.primary};
  font-family: 'Noto Sans KR';
  font-size: 22px;
  line-height: 21px;
  letter-spacing: 0.4px;
  text-align: center;
  color: ${(props) => props.theme.color.white};
  border-radius: 4px;

  &:disabled {
    background-color: ${(props) => props.theme.color.gray400};
  }
`;

export default CartTotal;
