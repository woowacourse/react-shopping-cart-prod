import TotalPriceBox from '../box/Cart/TotalPriceBox/TotalPriceBox';
import { Text } from '../common/Text/Text';
import CartList from '../list/CartList/CartList';
import PageTemplate from '../templates/PageTemplate';
import styled from '@emotion/styled';
import Modal from '../common/Modal/Modal';
import DeleteCartItemModal from '../common/Modal/DeleteCartItemModal';
import { useCartFetch } from '../../hooks/useCartFetch';
import { useRecoilValue } from 'recoil';
import { checkCartListState, couponListModalState, deleteModalState } from '../../service/atom';
import CouponBox from '../box/Cart/CouponBox/CouponBox';
import CouponListModal from '../common/Modal/CouponListModal';

const CartPage = () => {
  const { cartData } = useCartFetch();
  const checkCartList = useRecoilValue(checkCartListState);

  const calcTotalPrice = () => {
    return checkCartList.reduce((prev, curr) => {
      const cartItem = cartData && cartData.find((cart) => cart.id === curr);
      if (cartItem) {
        const { product, quantity } = cartItem;
        return prev + product.price * quantity;
      }
      return prev + 0;
    }, 0);
  };

  return (
    <PageTemplate
      title="장바구니 미션 - 장바구니페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 장바구니페이지입니다."
    >
      <CartPageWrapper>
        <CartPageHead>
          <Text size="extraLarge" weight="bold">
            장바구니
          </Text>
        </CartPageHead>
        <CartPageContent>
          <CartListWrapper>
            <CartList />
            <CouponBox />
          </CartListWrapper>
          <PriceBox>
            <TotalPriceBox
              totalProductPrice={calcTotalPrice()}
              shippingFee={checkCartList.length > 0 ? 3000 : 0}
              isValid={checkCartList.length > 0}
            />
          </PriceBox>
        </CartPageContent>
      </CartPageWrapper>
      <Modal modalState={deleteModalState}>
        <DeleteCartItemModal />
      </Modal>
      <Modal modalState={couponListModalState}>
        <CouponListModal />
      </Modal>
    </PageTemplate>
  );
};

export default CartPage;

const CartPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1140px;
  @media screen and (max-width: 1320px) {
    width: 940px;
  }

  @media screen and (max-width: 1000px) {
    width: 620px;
  }

  @media screen and (max-width: 660px) {
    width: 350px;
  }
`;

const CartListWrapper = styled.div`
  width: 740px;
  margin-top: -50px;
  margin-bottom: 200px;
  @media screen and (max-width: 1320px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

const CartPageHead = styled.div`
  border-bottom: 4px solid #333;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const CartPageContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 50px;
  position: relative;
  @media screen and (max-width: 1320px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PriceBox = styled.div`
  position: sticky;
  top: 150px;
  margin-top: 30px;
  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;
