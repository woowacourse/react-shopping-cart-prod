import styled from 'styled-components';
import { CartItemsSection } from './cartItemsSection/CartItemsSection';
import { OrderSummarySection } from './orderSummarySection/OrderSummarySection';
import { useRecoilValue } from 'recoil';
import { cartItemsLengthSelector } from '../../recoil/selectors/cartItemsSelector';

export const CartContent = () => {
  const cartItemsLength = useRecoilValue(cartItemsLengthSelector);

  return (
    <>
      {cartItemsLength > 0 ? (
        <Style.Content>
          <CartItemsSection />
          <OrderSummarySection />
        </Style.Content>
      ) : (
        <Style.EmptyCartContainer>
          <Style.EmptyCartImage
            src={
              'https://cdn-mart.baemin.com/front-end/assets/20230525153657/images/defaultEmptyImage.11f8bc33139d72b546eb54f5b89e2abf.png'
            }
          />
          장바구니가 비어있습니다!
        </Style.EmptyCartContainer>
      )}
    </>
  );
};

const Style = {
  Content: styled.div`
    width: 1320px;
    height: max-content;

    display: flex;
    gap: 104px;

    @media screen and (max-width: 480px) {
      width: 100vw;
    }
  `,
  EmptyCartContainer: styled.div`
    width: 1320px;
    min-height: 50vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 15px;

    font-size: 30px;

    @media screen and (max-width: 480px) {
      width: 90vw;

      font-size: 20px;
    }
  `,
  EmptyCartImage: styled.img`
    width: 200px;
    height: 200px;

    @media screen and (max-width: 480px) {
      width: 60vw;
      height: 60vw;
    }
  `,
};
