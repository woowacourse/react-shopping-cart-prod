import { useRecoilValue } from 'recoil';
import { Layout } from '../layout';
import { cartItemsState } from '../recoil/atoms/cartAtom';
import { useEffect } from 'react';
import { base64 } from '../constants/user';

export const Test = () => {
  const cartItems = useRecoilValue(cartItemsState);

  const handleOrderButtonClick = () => {
    // 일단 장바구니에 들어있는 모든 상품 다 주문한다고 가정한 계산 로직
    // TODO: SelectedCartItemIds 적용해서 선택된 상품만 계산되도록 하기
    fetch('/orders', {
      method: 'POST',
      headers: {
        Autorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: cartItems.map((cartItem) => cartItem.id),
        originalPrice: cartItems.reduce((acc, curr) => {
          return (acc += curr.product.price * curr.quantity);
        }, 0),
        usedPoint: 1000,
        pointToAdd: cartItems.reduce((acc, curr) => {
          const earnedPoint = curr.product.pointAvailable
            ? (curr.product.price * curr.quantity * curr.product.pointRatio) /
              100
            : 0;
          return (acc += earnedPoint);
        }, 0),
      }),
    });
  };

  useEffect(() => {
    console.log(cartItems);

    fetch('/order/0.3250189396132894')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <Layout>
      <button onClick={handleOrderButtonClick}>주문 요청하기</button>
    </Layout>
  );
};
