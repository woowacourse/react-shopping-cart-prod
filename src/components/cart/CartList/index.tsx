/* eslint-disable react-hooks/exhaustive-deps */
import { useCart } from '../../../hooks/useCart';
import { CartItem } from '../../../types';
import CartListItem from '../CartListItem';
import Checkbox from '../../@common/Checkbox';
import TotalCheckbox from '../TotalCheckbox';
import PriceWrapper from '../PriceWrapper';
import { LoadingSpinner } from '../../@common/LoadingSpinner';
import { S } from './CartList.styles';
import { Title } from '../../../style/commonStyle';
import emptyImage from '../../../assets/empty-image.png';

type Props = {
  cart: CartItem[];
  isLoading: boolean;
};

const CartList = ({ cart, isLoading }: Props) => {
  const {
    checkedItems,
    isChecked,
    setCheckedItems,
    totalPrice,
    handleCheckAllItems,
    handleCheckedItem,
    handleRemoveCheckedItem,
  } = useCart();

  const cartList = cart.map((cartItem) => (
    <S.ItemWrapper key={cartItem.product.id}>
      <Checkbox onChange={handleCheckedItem(cartItem.id)} isChecked={isChecked(cartItem.id)} />
      <CartListItem item={cartItem} setCheckItems={setCheckedItems} />
    </S.ItemWrapper>
  ));

  const itemList = (
    <S.ItemListWrapper>{isLoading ? <LoadingSpinner /> : cartList}</S.ItemListWrapper>
  );

  return (
    <>
      <Title>장바구니</Title>
      <S.Wrapper>
        {cart.length === 0 ? (
          <img src={emptyImage} alt="empty-cart" />
        ) : (
          <>
            <TotalCheckbox
              cartLength={cart.length}
              checkedItemsCount={checkedItems.length}
              handleCheckAllItems={handleCheckAllItems}
              clickRemoveButton={handleRemoveCheckedItem}
            />
            <S.ContentWrapper>
              {itemList}
              <PriceWrapper totalPrice={totalPrice} />
            </S.ContentWrapper>
          </>
        )}
      </S.Wrapper>
    </>
  );
};

export default CartList;
