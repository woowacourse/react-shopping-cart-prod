import { styled } from 'styled-components';
import CartEmptyPlaceholder from '../components/CartEmptyPlaceholder';
import CartItemListItem from '../components/CartItemListItem';
import CartOrder from '../components/CartOrder';
import Checkbox from '../components/common/Checkbox';
import AwaitRecoilState from '../components/utils/AwaitRecoilState';
import useCartActions from '../hooks/useCartActions';
import useCartOrder from '../hooks/useCartOrder';
import cartItemsState from '../recoil/atoms/cartItemsState';
import type { CartItem } from '../type';

const CartLayout = styled.article`
  margin-top: 32px;

  @media screen and (min-width: 992px) {
    grid-template-columns: minmax(auto, 720px) minmax(auto, 440px);
  }
`;

const CartItemListSection = styled.section`
  border-bottom: 7px solid ${({ theme }) => theme.colors.gray300};
`;

const CartItemList = styled.ul`
  & > * + * {
    border-top: 1.5px solid #cccccc;
  }
`;

const CartItemListItemContainer = styled.li`
  display: flex;
  gap: 16px;

  padding: 32px 0;
`;

const CartItemListController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  border-bottom: 7px solid ${({ theme }) => theme.colors.gray300};

  & span {
    display: flex;
  }
`;

const CartItemSelected = styled.strong`
  font-size: 16px;

  margin-left: 10px;
`;

const DeleteSelectedButton = styled.button`
  margin-right: 30px;

  ${({ theme }) => theme.fonts.description}
`;

type CartPageContentProps = {
  cartItems: CartItem[];
};

const CartPageContent = (props: CartPageContentProps) => {
  const { cartItems } = props;
  const selectedCount = cartItems.filter((cartItem) => !cartItem.unselectedForOrder).length;
  const allSelected = selectedCount === cartItems.length;

  const { deleteCartItems } = useCartActions();
  const { toggleForOrder, unselectAllForOrder, handleEnableAll } = useCartOrder();

  const handleDeleteSelected = (cartItems: CartItem[]) => () => {
    unselectAllForOrder();
    deleteCartItems(cartItems.map((cartItem) => cartItem.product.id));
  };

  return (
    <CartLayout>
      <CartItemListSection>
        <CartItemListController>
          <span>
            <Checkbox value={allSelected} onChange={handleEnableAll(cartItems, allSelected)} />
            <CartItemSelected>전체{cartItems.length}개</CartItemSelected>
          </span>
          <DeleteSelectedButton onClick={handleDeleteSelected(cartItems)}>
            선택삭제
          </DeleteSelectedButton>
        </CartItemListController>
        <CartItemList>
          {cartItems.map((cartItem) => (
            <CartItemListItemContainer key={cartItem.product.id}>
              <Checkbox
                value={!cartItem.unselectedForOrder}
                onChange={() => toggleForOrder(cartItem.product.id)}
              />
              <CartItemListItem
                key={cartItem.product.id}
                product={cartItem.product}
                quantity={cartItem.quantity}
              />
            </CartItemListItemContainer>
          ))}
        </CartItemList>
      </CartItemListSection>

      <CartOrder selectedCount={selectedCount} />
    </CartLayout>
  );
};

const CartPage = () => {
  return (
    <AwaitRecoilState state={cartItemsState}>
      {(cartItems) =>
        cartItems.length === 0 ? (
          <CartEmptyPlaceholder />
        ) : (
          <CartPageContent cartItems={cartItems} />
        )
      }
    </AwaitRecoilState>
  );
};

export default CartPage;
