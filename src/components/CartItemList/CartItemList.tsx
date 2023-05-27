import * as styled from './CartItemList.styled';
import { Checkbox } from '../styled/Checkbox';

import { useUpdateCart } from '../../hooks/useUpdateCart';
import { useCartStateValue } from '../../recoils/recoilCart';
import { useCheckedState } from '../../recoils/recoilChecked';

import { Button } from '../common/Button/Button';

import { GarbageIcon } from '../../assets/svg';
import { Stepper } from '../common/Stepper/Stepper';

import { CartItemType } from '../../types';

export const CartItemList = () => {
  const cart = useCartStateValue();

  const { deleteCartItem } = useUpdateCart();

  const [checkState, setCheckState] = useCheckedState();

  const onChangeCheckBox = (id: CartItemType['id']) => {
    setCheckState((prev) => {
      if (prev[id]) {
        const { [id]: _, ...updatedState } = prev;
        return {
          ...updatedState,
          all: false,
        };
      }
      return {
        ...prev,
        [id]: true,
      };
    });
  };

  const onClickDeleteIcon = (id: CartItemType['id']) => {
    if (checkState[id]) {
      setCheckState((prev) => {
        const { [id]: _, ...updatedState } = prev;

        return updatedState;
      });
    }

    deleteCartItem(id);
  };

  return (
    <ul>
      {cart.map(({ id, quantity, product }) => (
        <styled.CartItem key={id}>
          <styled.LeftInfo>
            <Checkbox
              type="checkbox"
              checked={Boolean(checkState[id])}
              onChange={() => onChangeCheckBox(id)}
            />
            <styled.ProductImage path={product.imageUrl} />
            <styled.ProductName>{product.name}</styled.ProductName>
          </styled.LeftInfo>
          <styled.RightInfo>
            <Button designType="square" onClick={() => onClickDeleteIcon(id)}>
              <GarbageIcon />
            </Button>
            <Stepper cartId={id} quantity={quantity} />
            <styled.ProductPrice>{product.price.toLocaleString('ko-KR')}원</styled.ProductPrice>
          </styled.RightInfo>
        </styled.CartItem>
      ))}
    </ul>
  );
};
