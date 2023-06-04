import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { GrFormNextLink } from 'react-icons/gr';
import { useSetRecoilState } from 'recoil';
import OrderInfo from '../../../types/order';
import OrderedProduct from '../OrderedProduct/OrderedProduct';
import { formatPrice } from '../../../utils/formatPrice';
import orderDetailState from '../../../globalState/atoms/orderDetail';

interface OrderDetailProps extends OrderInfo {
  showPayments?: boolean;
}

const OrderDetail = (props: OrderDetailProps) => {
  const { id, actualPrice, deliveryFee, cartItems, originalPrice, showPayments } = props;

  const setOrderDetailState = useSetRecoilState(orderDetailState);

  const setOrderDetails = () =>
    setOrderDetailState({
      id,
      actualPrice,
      deliveryFee,
      cartItems,
      originalPrice,
    });

  const originalPriceFormatted = formatPrice(originalPrice);
  const deliveryFeeFormatted = formatPrice(deliveryFee);
  const discountedPriceFormatted = formatPrice(Math.max(Math.ceil(originalPrice - actualPrice), 0));
  const finalPriceFormatted = formatPrice(Math.floor(actualPrice + deliveryFee));

  return (
    <OrderDetailDiv>
      <details open>
        <Summary>
          <OrderIdParagraph>주문 번호 : {id}</OrderIdParagraph>
          {!showPayments ? (
            <Link onClick={setOrderDetails} to="/order-details">
              상세보기 <GrFormNextLink size="23px" color="#333333" />
            </Link>
          ) : null}
        </Summary>
        <div>
          {cartItems.map(({ id: cartItemId, quantity, product: { imageUrl, name, price } }) => (
            <OrderedProduct
              key={cartItemId}
              name={name}
              price={price}
              quantity={quantity}
              imageUrl={imageUrl}
            />
          ))}
        </div>
      </details>
      {showPayments ? (
        <PaymentDiv>
          <PaymentTitleParagraph>
            <span>결제 금액 정보</span>
          </PaymentTitleParagraph>
          <div>
            <PaymentTextContainerDiv marginBottom="10px">
              <PaymentParagraph>총 가격</PaymentParagraph>
              <PaymentParagraph>{originalPriceFormatted}</PaymentParagraph>
            </PaymentTextContainerDiv>
            {originalPrice !== actualPrice ? (
              <PaymentTextContainerDiv marginBottom="20px">
                <PaymentParagraph>
                  <span aria-hidden="true">┕</span> 할인 금액
                </PaymentParagraph>
                <PaymentParagraph>-{discountedPriceFormatted}</PaymentParagraph>
              </PaymentTextContainerDiv>
            ) : null}
            <PaymentTextContainerDiv marginBottom="20px">
              <PaymentParagraph>배송비</PaymentParagraph>
              <PaymentParagraph>{deliveryFeeFormatted}</PaymentParagraph>
            </PaymentTextContainerDiv>
            <PaymentTextContainerDiv marginBottom="25px">
              <PaymentParagraph>최종 금액</PaymentParagraph>
              <PaymentParagraph>{finalPriceFormatted}</PaymentParagraph>
            </PaymentTextContainerDiv>
          </div>
        </PaymentDiv>
      ) : null}
    </OrderDetailDiv>
  );
};

const OrderDetailDiv = styled.div`
  width: 100%;
`;

const Summary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: auto 39px;
  height: 92px;

  border: 1px solid #aaaaaa;
  background-color: #f6f6f6;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  cursor: pointer;

  & > a {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 39px;

    color: #333333;
  }
`;

const OrderIdParagraph = styled.p`
  margin-left: 39px;
`;

const PaymentDiv = styled.div`
  margin: 30px 0 auto auto;
  width: 50%;

  border: 1px solid #aaaaaa;
  color: #333333;

  & > div {
    padding: 0 20px;
  }
`;

const PaymentTitleParagraph = styled.p`
  display: flex;
  align-items: center;

  padding: 15px 25px;
  height: 72px;
  margin-bottom: 25px;

  border-bottom: 1px solid #aaaaaa;
  background-color: #f6f6f6;
  font-weight: 700;
  font-size: 28px;
`;

const PaymentTextContainerDiv = styled.div<{ marginBottom?: string }>`
  display: flex;
  justify-content: space-between;

  margin-bottom: ${({ marginBottom }) => marginBottom || '0'};
  width: 100%;

  & > p:last-child {
    text-align: end;
  }
`;

const PaymentParagraph = styled.p`
  width: 50%;

  font-weight: 700;
  font-size: 20px;
  color: #333333;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default OrderDetail;
