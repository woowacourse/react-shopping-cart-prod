import type { CartItemType } from '../../types/product';

import styled from 'styled-components';

import CheckBox from '../Common/CheckBox';
import Image from '../Common/Image';
import AmountCounter from '../Common/AmountCounter';

import TrashCanIcon from '../../assets/TrashCanIcon';
import useCart from '../../hooks/useCart';
import useCheckedCart from '../../hooks/useCheckedCart';

interface CartItemProps {
  cartItem: CartItemType;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { quantity, product } = cartItem;
  const { name, price, imageUrl } = product;
  const { removeProduct, addCount, subtractCount } = useCart(product);
  const { handleCheckBoxChange, isCheckedProduct } = useCheckedCart();

  return (
    <CartItemContainer>
      <CheckBoxWrapper>
        <CheckBox
          onChange={() => handleCheckBoxChange(cartItem)}
          checked={isCheckedProduct(cartItem)}
        />
      </CheckBoxWrapper>
      <Image src={imageUrl} alt={name} loading='lazy' size='small' />
      <CartItemName>{name}</CartItemName>
      <CartItemRightWrapper>
        <button onClick={removeProduct}>
          <TrashCanIcon />
        </button>
        <AmountCounter
          designtype='cart'
          count={quantity}
          addCount={addCount}
          subtractCount={subtractCount}
        />
        <p>{price.toLocaleString('ko-KR')}원</p>
      </CartItemRightWrapper>
    </CartItemContainer>
  );
};

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CheckBoxWrapper = styled.div`
  margin-right: 15px;
`;

const CartItemName = styled.p`
  width: 50%;
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CartItemRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export default CartItem;
