import { useDispatch, useSelector } from 'react-redux';
import {
  CartItem,
  CartState,
  deleteCartAPI,
  selectCartState,
  selectItem,
  updateCartAPI,
} from 'redux/modules/cart';

import { CheckBox } from 'components/@shared';
import { Spinner } from 'components/@shared/Loader/styles';

import { MESSAGES, PRODUCT } from 'constants/index';
import Delete from 'assets/Delete.png';
import {
  CartProductContainer,
  ProductAmountContainer,
  ProductAmountWrapper,
  ProductCounterContainer,
  ProductImageContainer,
  ProductOptionContainer,
} from './styles';

interface CartProductProps {
  item: CartItem;
}

function CartProduct({
  item: { id, imageUrl, name, price, quantity, isSelected },
}: CartProductProps) {
  const dispatch = useDispatch();
  const { updateCartLoading }: CartState = useSelector(selectCartState);

  const onToggleSelect = () => {
    dispatch(selectItem(id));
  };

  const onClickDeleteItem = () => {
    if (confirm(MESSAGES.ASK_DELETE_PRODUCT)) {
      dispatch(deleteCartAPI(id));
    }
  };

  const onClickIncreaseCounter = () => {
    dispatch(updateCartAPI(id, quantity + 1));
  };

  const onClickDecreaseCounter = () => {
    if (quantity === PRODUCT.MIN_COUNT) {
      return;
    }
    dispatch(updateCartAPI(id, quantity - 1));
  };

  return (
    <CartProductContainer>
      <CheckBox checked={isSelected} onChange={onToggleSelect} />
      <ProductImageContainer>
        <img src={imageUrl} alt={name} />
        <span>{name}</span>
      </ProductImageContainer>
      <ProductOptionContainer>
        <img src={Delete} alt="상품 삭제" onClick={onClickDeleteItem} />
        <ProductAmountContainer>
          <ProductAmountWrapper>
            {updateCartLoading ? <Spinner size="10px" /> : quantity}
          </ProductAmountWrapper>
          <ProductCounterContainer>
            <button onClick={onClickIncreaseCounter}>▲</button>
            <button onClick={onClickDecreaseCounter}>▼</button>
          </ProductCounterContainer>
        </ProductAmountContainer>
        <span>{price.toLocaleString()}원</span>
      </ProductOptionContainer>
    </CartProductContainer>
  );
}

export default CartProduct;
