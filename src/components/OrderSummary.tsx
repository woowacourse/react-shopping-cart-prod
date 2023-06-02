import { styled } from 'styled-components';

import { useTotalProductPrice } from '../recoils/recoilTotalPrice';

import { Button } from './common/Button';

import { DELIVERY_CHARGE, FETCH_METHOD } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useCartStateValue } from '../recoils/recoilCart';
import { useApiBaseUrlValue } from '../recoils/recoilApiBaseUrl';
import { useMutation } from '../hooks/useMutation';


export const OrderSummary = () => {
  const cart = useCartStateValue();

  const baseUrl = useApiBaseUrlValue();
  const { mutation, data} = useMutation(FETCH_METHOD.POST);

  const cartOrder = cart.map((product)=>{
    return {"cartItemId":Number(product.id), "quantity":product.quantity}
  })

  const totalProductPrice = useTotalProductPrice();

  const navigate = useNavigate();

  const DeliveryCharge = DELIVERY_CHARGE;

  // console.log(cart)

  const postCart = {
		"totalProductsPrice": totalProductPrice, // -> 백엔드쪽에서 계산하여 비교하고 통화해야 save
    "shippingFee": totalProductPrice >= 30000 ? 0 : 3000,
		"usedPoint": 0,
    "order": cartOrder
}

  const orderOnClick = () => {
    mutation(baseUrl+'/orders', postCart)
    console.log(postCart)
    navigate('/order-list')
  }


  return (
    <>
      <>
        <Style.OrderSummary>
          <Style.OrderSummaryHeader>결제예상금액</Style.OrderSummaryHeader>
          <Style.Content>
            <Style.Prices>
              <Style.Price>
                <span>총 상품가격</span>
                <span>{totalProductPrice.toLocaleString('ko-kr')}원</span>
              </Style.Price>
              <Style.Price>
                <span>총 배송비</span>
                <span>{DeliveryCharge.toLocaleString('ko-kr')}원</span>
              </Style.Price>
              <Style.Price>
                <span>총 주문금액</span>
                <span>{(totalProductPrice + DeliveryCharge).toLocaleString('ko-kr')}원</span>
              </Style.Price>
            </Style.Prices>
            <Button designType="rectangle" onClick={orderOnClick}>주문하기</Button>
          </Style.Content>
        </Style.OrderSummary>
      </>
      <>
        <Mobile.OrderSummary>
          <Mobile.Prices>
            <Mobile.Price>
              <div>총 상품가격</div>
              <div>{totalProductPrice.toLocaleString('ko-kr')}원</div>
            </Mobile.Price>
            <Mobile.Price>
              <div>배송비</div>
              <div>{DeliveryCharge.toLocaleString('ko-kr')}</div>
            </Mobile.Price>
            <Mobile.Price>
              <div>총 주문금액</div>
              <div>{(totalProductPrice + DeliveryCharge).toLocaleString('ko-kr')}원</div>
            </Mobile.Price>
          </Mobile.Prices>
          <Mobile.OrderButton>주문하기</Mobile.OrderButton>
        </Mobile.OrderSummary>
      </>
    </>
  );
};

const Style = {
  OrderSummary: styled.section`
    position: -webkit-sticky;
    position: sticky;
    top: 100px;

    width: 370px;
    height: fit-content;

    margin-top: 45px;

    border: 1px solid var(--grey-200);

    @media screen and (max-width: 500px) {
      display: none;
    }
  `,

  OrderSummaryHeader: styled.h2`
    padding: 22px 30px;

    border-bottom: 3px solid var(--grey-200);

    color: var(--grey-400);

    font-size: 24px;

    letter-spacing: 0.5px;
  `,

  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    padding: 36px;
  `,

  Prices: styled.div`
    padding: 0 6px;

    width: 100%;
  `,

  Price: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;

    margin-bottom: 42px;

    font-style: normal;
    font-weight: 700;
    font-size: 18px;

    letter-spacing: 0.5px;

    &:first-child {
      margin-bottom: 20px;
    }
  `,
};

const Mobile = {
  OrderSummary: styled.div`
    position: fixed;
    bottom: 0;
    right: 0;

    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 80px;

    padding: 16px;

    background-color: var(--grey-500);
    color: var(--grey-100);

    border-top: 2px solid var(--grey-400);

    z-index: 100;

    @media screen and (min-width: 501px) {
      display: none;
    }
  `,

  Prices: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    width: 100%;
  `,

  Price: styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    font-size: 12px;

    & > div {
      display: inline-block;
    }

    & > div:last-child {
      font-weight: 600;
      margin-top: 10px;
    }
  `,

  OrderButton: styled.button`
    width: 100px;

    background-color: var(--primary-color);
    color: var(--grey-100);

    font-weight: 600;

    border: none;
    border-radius: 10px;
  `,
};
