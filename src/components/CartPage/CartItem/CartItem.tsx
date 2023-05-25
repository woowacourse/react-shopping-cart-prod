import { useRef } from 'react';
import { DELETE_CART_ITEM } from '../../../constants/cart';
import { useCartSelector, useMutateCart } from '../../../hooks/cart/cart';
import { CartItem as CartItemType } from '../../../types/cart';
import { debounce } from '../../../utils/debounce';
import Flex from '../../common/Flex';
import QuantityStepper from '../../common/QuantityStepper/QuantityStepper';
import * as S from './CartItem.styles';

type CartItemProps = CartItemType;

const CartItem: React.FC<CartItemProps> = (props) => {
  const {
    id,
    quantity,
    product: { imageUrl, name, price },
  } = props;
  const quantityRef = useRef<HTMLInputElement>(null);
  const { selectedItems, selectItem } = useCartSelector();
  const { updateCartItemMutation, deleteCartItemMutation } = useMutateCart();

  const updateQuantity = debounce(() =>
    updateCartItemMutation({
      cartId: id,
      quantity: Number(quantityRef.current?.value),
    })
  );

  const deleteCartItem = () => {
    window.confirm(DELETE_CART_ITEM) && deleteCartItemMutation(id);
  };

  return (
    <S.Root>
      <Flex grow height="100%" align="center">
        <S.Checkbox
          type="checkbox"
          checked={selectedItems.has(id)}
          onChange={() => selectItem(id)}
        />
        <S.ProductContainer height="100%" align="center" grow>
          <S.Thumbnail alt={name} src={imageUrl} />
          <S.Name>{name}</S.Name>
          <S.Info dir="column" justify="space-between" align="end">
            <S.DeleteButton onClick={deleteCartItem}>X</S.DeleteButton>
            <QuantityStepper
              max={100}
              min={1}
              ref={quantityRef}
              init={quantity}
              onIncrease={updateQuantity}
              onDecrease={updateQuantity}
            />
            <S.Price>{price.toLocaleString()} 원</S.Price>
          </S.Info>
        </S.ProductContainer>
      </Flex>
    </S.Root>
  );
};

export default CartItem;
