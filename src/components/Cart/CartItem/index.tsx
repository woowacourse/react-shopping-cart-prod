import * as S from './CartItem.styles';
import Counter from 'components/@common/Counter';
import Svg from 'components/@common/Svg';
import { useCart } from 'components/Cart/hooks/useCart';
import { useCheckedItemIds } from '../hooks/useCheckedItems';
import { Cart } from 'types';

interface CartItemProps {
  cartItem: Cart;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { decreaseItemQuantity, increaseItemQuantity, deleteItem } = useCart();
  const { checkItem, checkedItemIds, unCheckItem } = useCheckedItemIds();
  const { product } = cartItem;

  const onCheckItem = () => {
    checkItem(cartItem.id);
  };

  const onDelete = () => {
    deleteItem(cartItem.id);
    unCheckItem(cartItem.id);
  };

  const increase = () => {
    increaseItemQuantity(cartItem.id);
  };

  const decrease = () => {
    decreaseItemQuantity(cartItem.id);
  };

  return (
    <S.CartItemWrapper>
      <S.CheckBox
        type="checkbox"
        onChange={onCheckItem}
        checked={checkedItemIds.includes(cartItem.id)}
      />
      <S.CartItemImage src={product.imageUrl} alt={product.name} />
      <S.CartProductName>{product.name}</S.CartProductName>
      <S.CounterWrapper>
        <button onClick={onDelete}>
          <Svg type="trash-can" width={24} height={24} />
        </button>
        <Counter
          count={cartItem.quantity}
          min={1}
          increment={increase}
          decrement={decrease}
        />
        <S.CartProductPrice>
          {product.price.toLocaleString('KR')}원
        </S.CartProductPrice>
      </S.CounterWrapper>
    </S.CartItemWrapper>
  );
};

export default CartItem;
