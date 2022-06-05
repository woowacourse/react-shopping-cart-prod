import useCart from 'hooks/useCart';

import { FlexContainer, Title, TextUnderline, Icon } from 'components/@common';

import { ICON_CODE } from 'constants/';

import CartItemList from './Containers/CartItemList';
import CartItemManage from './Containers/CartItemManage';
import ProductOrder from './Containers/ProductOrder';
import * as S from './styles';

export function CartListPage() {
<<<<<<< HEAD
  const { cartState, computed } = useCart();
  const { items: cartItems } = cartState;

  const isSelectAllChecked = computed.checkedItemList.length > 0;
=======
  const { state } = useCart();
  const { cartItems, isLoaded, checkedItemList } = state;

  const isSelectAllChecked = checkedItemList.length > 0;
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854

  return (
    <>
      <Title description="구매할 상품을 체크한 후 우측의 주문하기를 누르시면 상품을 주문할 수 있어요!">
        <Icon icon={ICON_CODE.CART} />
        장바구니
      </Title>

      <S.Container>
        <FlexContainer gap={16}>
          <CartItemManage isAllChecked={isSelectAllChecked} />

          <FlexContainer>
            <Title type="content" size={14}>
              장바구니 상품{'\u00A0'}
<<<<<<< HEAD
              <TextUnderline>{`(${cartItems.length}개 담김)`}</TextUnderline>
=======
              <TextUnderline>
                {isLoaded === true ? `(${cartItems.length}개 담김)` : '(0개 담김)'}
              </TextUnderline>
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854
            </Title>

            <CartItemList />
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="column">
          <ProductOrder />
        </FlexContainer>
      </S.Container>
    </>
  );
}
export default CartListPage;
