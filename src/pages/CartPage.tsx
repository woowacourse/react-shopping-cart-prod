import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import CartEmptyPlaceholder from '../components/CartEmptyPlaceholder';
import CartItemListItem from '../components/CartItemListItem';
import CartOrder from '../components/CartOrder';
import PageHeader from '../components/PageHeader';
import Checkbox from '../components/common/Checkbox';
import AwaitRecoilState from '../components/utils/AwaitRecoilState';
import cartItemsState from '../recoil/atoms/cartItemsState';
import cartItemsRepository from '../recoil/repositories/cartItemsRepository';
import type { CartItem } from '../types/CartItem';

const CartLayout = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  align-items: flex-start;
  justify-content: space-between;
  row-gap: 48px;
  column-gap: 24px;

  margin-top: 32px;

  @media screen and (min-width: 992px) {
    grid-template-columns: minmax(auto, 720px) minmax(auto, 440px);
  }
`;

const CartItemListSection = styled.section``;

const CartItemListCaption = styled.h2`
  margin-bottom: 16px;

  font-size: 20px;
`;

const CartItemList = styled.ul`
  border-top: 4px solid #aaaaaa;

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
  align-items: center;
  gap: 16px;
`;

const CartItemSelected = styled.p`
  font-size: 16px;
`;

const DeleteSelectedButton = styled.button`
  padding: 6px;

  border: 1px solid #bbbbbb;
  font-size: 16px;
`;

type CartPageContentProps = {
  cartItems: CartItem[];
};

const CartPageContent = (props: CartPageContentProps) => {
  const { cartItems } = props;
  const selectedCount = cartItems.filter((cartItem) => cartItem.checked).length;
  const allSelected = selectedCount === cartItems.length;

  const { setChecked, removeCheckedCartItem } = useRecoilValue(cartItemsRepository);

  const handleEnableAll = () => {
    cartItems.forEach((cartItem) => setChecked(cartItem, !allSelected));
  };

  return (
    <CartLayout>
      <CartItemListSection>
        <CartItemListCaption>배송 상품 ({cartItems.length}개)</CartItemListCaption>
        <CartItemList>
          {cartItems.map((cartItem) => (
            <CartItemListItemContainer>
              <Checkbox
                value={cartItem.checked}
                onChange={() => setChecked(cartItem, !cartItem.checked)}
              />
              <CartItemListItem
                key={cartItem.product.id}
                product={cartItem.product}
                quantity={cartItem.quantity}
              />
            </CartItemListItemContainer>
          ))}
        </CartItemList>

        <CartItemListController>
          <Checkbox value={allSelected} onChange={handleEnableAll} />
          <CartItemSelected>
            전체선택 ({selectedCount}/{cartItems.length}개)
          </CartItemSelected>
          <DeleteSelectedButton onClick={removeCheckedCartItem}>선택삭제</DeleteSelectedButton>
        </CartItemListController>
      </CartItemListSection>

      <CartOrder isCartEmpty={selectedCount === 0} />
    </CartLayout>
  );
};

const CartPage = () => {
  return (
    <>
      <PageHeader>장바구니</PageHeader>

      <AwaitRecoilState state={cartItemsState}>
        {(cartItems) =>
          cartItems.length === 0 ? (
            <CartEmptyPlaceholder />
          ) : (
            <CartPageContent cartItems={cartItems} />
          )
        }
      </AwaitRecoilState>
    </>
  );
};

export default CartPage;
