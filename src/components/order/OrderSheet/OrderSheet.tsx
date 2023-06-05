import { styled } from 'styled-components';
import { formatPrice } from '../../../utils/formatPrice';
import OrderSheetPayment from './OrderSheetPayment/OrderSheetPayment';
import OrderSheetItemList from './OrderSheetProduct/OrderSheetProductList';
import OrderSheetCouponList from './OrderSheetCoupon/OrderSheetCouponList';
import useOrderSheet from './useOrderSheet';

const OrderSheet = () => {
  const {
    checkedCartList,
    handleChangeCoupon,
    getProductAmount,
    getDiscountAmount,
    getDeliveryFee,
    getTotalOrderAmount,
    handleOrder,
  } = useOrderSheet();

  return (
    <OrderSheetContainer>
      <OrderContents>
        <div>
          <Title>주문 상품</Title>
          <OrderSheetItemList checkedCartList={checkedCartList} />
        </div>
        <div>
          <Title>쿠폰 목록</Title>
          <OrderSheetCouponList onChangeCoupon={handleChangeCoupon} />
        </div>

        <div>
          <Title>주문 금액</Title>
          <OrderSheetPayment
            productAmount={getProductAmount()}
            discountAmount={getDiscountAmount()}
            deliveryFee={getDeliveryFee()}
          />
        </div>
      </OrderContents>
      <OrderButton onClick={handleOrder}>
        {formatPrice(getTotalOrderAmount())} 주문하기
      </OrderButton>
    </OrderSheetContainer>
  );
};

const OrderSheetContainer = styled.div`
  position: relative;

  height: 100%;
`;

const OrderContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  width: 100%;
  height: 85%;

  overflow: auto;
`;

const Title = styled.h3`
  font-size: 26px;
  margin-bottom: 20px;
`;

const OrderButton = styled.button`
  position: absolute;

  bottom: 0;

  width: 100%;
  height: 50px;

  background-color: #333;
  border: none;
  border-radius: 8px;

  font-size: 18px;
  color: white;

  cursor: pointer;
`;

export default OrderSheet;
