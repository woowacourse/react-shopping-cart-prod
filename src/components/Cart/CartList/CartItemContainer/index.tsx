import { formatDecimal } from 'utils';
import CheckBox from 'components/@common/CheckBox';
import CroppedImage from 'components/@common/CroppedImage';
import QuantityController from './QuantityController';
import useUpdateCartItem from 'hooks/useUpdateCartItem';
import { Styled } from './styles';

export default function CartItemContainer({ cartList, cartItem }) {
  const { increaseQuantity, decreaseQuantity, removeCartItem, toggleCartItemChecked } =
    useUpdateCartItem(cartList);

  const toggleChecked = (targetId: number) => {
    toggleCartItemChecked(targetId);
  };

  const deleteItem = (targetId: number) => {
    removeCartItem(targetId);
  };

  return (
    <Styled.CartItemContainer key={cartItem.id}>
      <CheckBox
        id={`${cartItem.id}`}
        checked={cartItem.checked}
        onChange={() => toggleChecked(cartItem.id)}
      />
      <CroppedImage src={cartItem.imageUrl} width='150px' height='144px' alt='상품' />
      <Styled.ItemName>{cartItem.name}</Styled.ItemName>
      <Styled.Operator>
        <Styled.TrashCan id={cartItem.id} onClick={() => deleteItem(cartItem.id)} />
        <QuantityController
          quantity={cartItem.quantity}
          onIncreaseClick={() => increaseQuantity(cartItem.productId)}
          onDecreaseClick={() => decreaseQuantity(cartItem.productId)}
        ></QuantityController>
        <Styled.TotalPrice>{formatDecimal(cartItem.price)} 원</Styled.TotalPrice>
      </Styled.Operator>
    </Styled.CartItemContainer>
  );
}
