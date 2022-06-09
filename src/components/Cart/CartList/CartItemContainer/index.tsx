import styled from 'styled-components';
import { formatDecimal } from 'utils';
import CheckBox from 'components/common/CheckBox';
import CroppedImage from 'components/common/CroppedImage';
import { ReactComponent as TrashCanIcon } from 'assets/trashCanIcon.svg';
import QuantityController from './QuantityController';
import useUpdateCartItem from 'hooks/useUpdateCartItem';

export default function CartItemContainer({ cartList, cartItem, totalPrice }) {
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
          onIncreaseClick={() => increaseQuantity(cartItem.id)}
          onDecreaseClick={() => decreaseQuantity(cartItem.id)}
        ></QuantityController>
        <Styled.TotalPrice>{formatDecimal(totalPrice)} 원</Styled.TotalPrice>
      </Styled.Operator>
    </Styled.CartItemContainer>
  );
}

const Styled = {
  CartItemContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;

    border-bottom: solid silver 0.15rem;
    padding: 2rem 0;
  `,

  ItemName: styled.div`
    width: 26rem;
    padding: 0rem 2rem;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 2rem;
  `,

  Operator: styled.div`
    display: flex;
    flex-direction: column;

    gap: 2rem;
    align-items: flex-end;
    width: 20rem;
  `,

  TrashCan: styled(TrashCanIcon)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,

  TotalPrice: styled.p`
    font-size: 1.6rem;
  `,
};
