import { styled } from 'styled-components';

import { useTotalProductPrice } from '../../recoils/recoilTotalPrice';

import { Button } from '../common/Button';

import { DELIVERY_CHARGE, FETCH_METHOD, LOCALE, ZERO } from '../../constants';
import { useCartStateValue, useSetCartState } from '../../recoils/recoilCart';
import { useApiBaseUrlValue } from '../../recoils/recoilApiBaseUrl';
import { useMutation } from '../../hooks/useMutation';
import { useSetCheckedState } from '../../recoils/recoilChecked';
import { useQuery } from '../../hooks/useQuery';
import { Discount, Point } from '../../types';
import { useState } from 'react';
import { localeString } from '../../utils/localeString';
import { ToastMessage } from '../common/ToastMessage';

const OrderSummary = () => {
  const cart = useCartStateValue();
  const [usePoint, setUsePoint] = useState<number>(0);

  const baseUrl = useApiBaseUrlValue();
  const { mutation } = useMutation(FETCH_METHOD.POST);

  const { data: point } = useQuery<Point>(baseUrl + '/point', true);

  const { data: discount } = useQuery<Discount>(baseUrl + '/order-policy', true);

  const cartOrder = cart.map((product) => {
    return { cartItemId: Number(product.id), quantity: product.quantity };
  });

  const setCart = useSetCartState();
  const setChecked = useSetCheckedState();

  const [toast, setToast] = useState(false);

  const totalProductPrice = useTotalProductPrice();

  if (!point || !discount) return <></>;

  const postCart = {
    totalProductsPrice: totalProductPrice,
    shippingFee: totalProductPrice >= discount.freeShippingThreshold ? ZERO : DELIVERY_CHARGE,
    usedPoint: usePoint,
    order: cartOrder,
  };

  const orderOnClick = () => {
    mutation(baseUrl + '/orders', postCart);

    setCart([]);
    setChecked({ all: true });

    setToast(true);
  };

  const pointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsePoint(Number(e.target.value));
  };

  return (
    <>
      <>
        <Style.OrderSummary>
          {toast && (
            <ToastMessage setToast={setToast}>{'주문 등록이 완료되었습니다.'}</ToastMessage>
          )}
          <Style.OrderSummaryHeader>결제예상금액</Style.OrderSummaryHeader>
          <Style.Content>
            <Style.Prices>
              <Style.Price>
                <span>총 상품가격</span>
                <span>{localeString(totalProductPrice, LOCALE.KOREA)}원</span>
              </Style.Price>
              <Style.Price>
                <span>총 배송비</span>
                <span>
                  {totalProductPrice >= discount.freeShippingThreshold
                    ? ZERO
                    : localeString(DELIVERY_CHARGE, LOCALE.KOREA)}
                  원
                </span>
              </Style.Price>
              <Style.Price>
                <span>보유 포인트</span>
                <span>{point ? localeString(point.usablePoint, LOCALE.KOREA) + '원' : '0원'}</span>
              </Style.Price>
              <Style.Price>
                <span>사용할 포인트</span>
                <Style.PointWrapper>
                  <Style.PointInput
                    type="number"
                    value={usePoint === ZERO ? '' : usePoint}
                    onChange={pointChange}
                  />
                  <span>{point?.usablePoint >= usePoint ? '' : '포인트가 부족합니다.'}</span>
                </Style.PointWrapper>
              </Style.Price>
              <Style.Price>
                <span>총 주문금액</span>
                <span>
                  {totalProductPrice >= discount.freeShippingThreshold
                    ? localeString(totalProductPrice - usePoint, LOCALE.KOREA)
                    : localeString(totalProductPrice + DELIVERY_CHARGE - usePoint, LOCALE.KOREA)}
                  원
                </span>
              </Style.Price>
            </Style.Prices>
            <Button
              designType="rectangle"
              onClick={orderOnClick}
              disabled={Boolean(
                totalProductPrice < usePoint ||
                  (point?.usablePoint && point?.usablePoint < usePoint)
              )}
            >
              주문하기
            </Button>
          </Style.Content>
        </Style.OrderSummary>
      </>
      <>
        <Mobile.OrderSummary>
          {toast && (
            <ToastMessage setToast={setToast}>{'주문 등록이 완료되었습니다.'}</ToastMessage>
          )}
          <Mobile.Prices>
            <Mobile.Price>
              <div>총 상품가격</div>
              <div>{localeString(totalProductPrice, LOCALE.KOREA)}원</div>
            </Mobile.Price>
            <Mobile.Price>
              <div>배송비</div>
              <div>
                {' '}
                {totalProductPrice >= discount.freeShippingThreshold
                  ? ZERO
                  : localeString(DELIVERY_CHARGE, LOCALE.KOREA)}
                원
              </div>
            </Mobile.Price>
            <Mobile.Price>
              <div>보유 포인트</div>
              <div>{point ? localeString(point.usablePoint, LOCALE.KOREA) + '원' : '0원'}</div>
            </Mobile.Price>
            <Mobile.Price>
              <div>총 주문금액</div>
              <div>
                {totalProductPrice >= discount.freeShippingThreshold
                  ? localeString(totalProductPrice - usePoint, LOCALE.KOREA)
                  : localeString(totalProductPrice + DELIVERY_CHARGE - usePoint, LOCALE.KOREA)}
                원
              </div>
            </Mobile.Price>
            <Mobile.Price>
              <div>사용할 포인트</div>
              <Mobile.PointWrapper>
                <Mobile.PointInput
                  type="number"
                  value={usePoint === ZERO ? '' : usePoint}
                  onChange={pointChange}
                />
              </Mobile.PointWrapper>
            </Mobile.Price>
            <Mobile.Price>
              <Mobile.PointWrapper>
                <div>{point?.usablePoint >= usePoint ? '' : '포인트 초과'}</div>
              </Mobile.PointWrapper>
            </Mobile.Price>
          </Mobile.Prices>
          <Button
            designType="rectangle"
            onClick={orderOnClick}
            disabled={Boolean(
              totalProductPrice < usePoint || (point?.usablePoint && point?.usablePoint < usePoint)
            )}
          >
            주문하기
          </Button>
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

    &:first-child,
    &:nth-child(3) {
      margin-bottom: 20px;
    }
  `,

  PointWrapper: styled.div`
    display: flex;
    flex-direction: column;

    & > span {
      margin-top: 9px;
      color: red;
      font-size: 9px;
      text-align: center;
    }
  `,

  PointInput: styled.input`
    width: 120px;
    height: 32px;
    font-size: 15px;

    text-align: right;

    border: 0.5px solid gray;

    background-color: rgb(245, 245, 245);

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
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
    height: 150px;

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

  PointWrapper: styled.div`
    display: flex;
    flex-direction: row;

    & > div {
      margin-top: 9px;
      color: red;
      font-size: 9px;
      text-align: center;
    }
  `,

  PointInput: styled.input`
    width: 100px;
    height: 15px;
    font-size: 15px;

    text-align: right;

    border: 0.5px solid gray;

    background-color: rgb(245, 245, 245);

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
};

export default OrderSummary;
