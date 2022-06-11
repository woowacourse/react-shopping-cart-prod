import { useDispatch } from 'react-redux';
import { decrement, deleteItem, increment, selectItem } from '@/redux/modules/cart/cartAction';

import {
  CartProductContainer,
  ProductAmountContainer,
  ProductAmountWrapper,
  ProductCounterContainer,
  ProductImageContainer,
  ProductOptionContainer,
} from './styles';

import { CartItem } from '@/types';

import { CheckBox } from '@/components/@shared';

import { INFO_MESSAGES, PRODUCT } from '@/constants';
import Delete from '@/assets/Delete.png';

interface CartProductProps {
  item: CartItem;
}

function CartProduct({
  item: { id, imageUrl, name, price, quantity, isSelected },
}: CartProductProps) {
  const dispatch = useDispatch();

  const onToggleSelect = () => {
    dispatch(selectItem(id));
  };

  const onClickDeleteItem = () => {
    confirm(INFO_MESSAGES.ASK_DELETE_PRODUCT) && dispatch(deleteItem(id));
  };

  const onClickIncreaseCounter = () => {
    dispatch(increment(id));
  };

  const onClickDecreaseCounter = () => {
    if (quantity === PRODUCT.MIN_COUNT) {
      return;
    }
    dispatch(decrement(id));
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
          <ProductAmountWrapper>{quantity}</ProductAmountWrapper>
          <ProductCounterContainer>
            <button onClick={onClickIncreaseCounter}>▲</button>
            <button onClick={onClickDecreaseCounter}>▼</button>
          </ProductCounterContainer>
        </ProductAmountContainer>
        <span>{(price * quantity).toLocaleString()}원</span>
      </ProductOptionContainer>
    </CartProductContainer>
  );
}

export default CartProduct;
