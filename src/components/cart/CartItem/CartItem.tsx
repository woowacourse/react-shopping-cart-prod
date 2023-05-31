import { styled } from 'styled-components';
import { useState } from 'react';
import CheckBox from '../../common/CheckBox/CheckBox';
import Image from '../../common/Image/Image';
import Counter from '../../common/Counter/Counter';
import TrashCanIcon from '../../../assets/icons/TrashCanIcon';
import useCartService from '../../../hooks/useCartService';
import { formatPrice } from '../../../utils/formatPrice';
import { useCheckedCartListValue } from '../../../provider/CheckedListProvider';
import type { CartProduct } from '../../../types/product';

interface CartItemProps {
  cartItem: CartProduct;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { id, quantity } = cartItem;
  const { imageUrl, name, price } = cartItem.product;

  const { updateCartItemQuantity, deleteCartItem } = useCartService();
  const { isChecked, addCheckedItem, deleteCheckedItem } = useCheckedCartListValue();
  const [count, setCount] = useState(quantity);

  const updateQuantity = (value: number) => {
    setCount(value);
    updateCartItemQuantity(id)(value);
  };

  const handleRemoveButtonClick = () => {
    if (!window.confirm('해당 물품을 장바구니에서 삭제 하시겠습니까?')) return;

    deleteCartItem(id);
    deleteCheckedItem(id);
  };

  const handleCheckBoxChange = () => {
    if (isChecked(id)) {
      deleteCheckedItem(id);
      return;
    }

    addCheckedItem(id);
  };

  return (
    <CartItemContainer>
      <ItemContents>
        <CheckBox isChecked={isChecked(id)} onChange={handleCheckBoxChange} />
        <Image src={imageUrl} size="medium" />
        <div>
          <Name>{name}</Name>
          <PriceMobileView>{formatPrice(price)}</PriceMobileView>
        </div>
      </ItemContents>
      <ItemControllers>
        <RemoveButton onClick={handleRemoveButtonClick}>
          <TrashCanIcon />
        </RemoveButton>
        <Counter count={count} updateCount={updateQuantity} min={1} />
        <PricePCView>{formatPrice(price)}</PricePCView>
      </ItemControllers>
    </CartItemContainer>
  );
};

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 735px;
  height: 200px;

  padding: 25px 0;

  @media screen and (max-width: 1320px) {
    width: 100%;
  }

  @media screen and (max-width: 520px) {
    flex-direction: column;

    height: 250px;
  }
`;

const ItemContents = styled.div`
  max-height: 182px;
  display: flex;
  gap: 15px;

  width: calc(100% - 120px);

  overflow: hidden;

  @media screen and (max-width: 520px) {
    width: 100%;
  }
`;

const Name = styled.div`
  max-height: 120px;

  font-weight: 400;
  font-size: 20px;
  color: #333;

  @media screen and (max-width: 520px) {
    overflow: hidden;
  }
`;

const ItemControllers = styled.div`
  display: flex;
  flex-direction: column;

  align-items: end;
  justify-content: space-between;

  @media screen and (max-width: 520px) {
    flex-direction: row-reverse;
    padding-left: 43px;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
`;

const RemoveButton = styled.button`
  border: none;
  background: none;

  cursor: pointer;
`;

const PricePCView = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #333;

  @media screen and (max-width: 520px) {
    display: none;
  }
`;

const PriceMobileView = styled.div`
  display: none;

  margin-top: 10px;

  font-weight: 400;
  font-size: 20x;
  color: #333;

  @media screen and (max-width: 520px) {
    display: block;
  }
`;

export default CartItem;
