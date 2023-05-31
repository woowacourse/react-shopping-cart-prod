import QuantityInput from '../../QuantityInput';
import { CartItem } from '../../../types';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useProduct } from '../../../hooks/useProduct';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { S } from './CartListItem.styles';

interface Props {
  item: CartItem;
  setCheckItems: Dispatch<SetStateAction<number[]>>;
}

const CartListItem = ({ item, setCheckItems }: Props) => {
  const {
    removeItem,
    handleNumberInputChange,
    handleIncreaseItem,
    handleDecreaseCartItem,
  } = useProduct(item.product.id);

  const handleRemoveFromCart = (id: number) => (e: MouseEvent<HTMLButtonElement>) => {
    const confirmResult = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmResult) {
      setCheckItems((prev) => prev.filter((itemId) => itemId !== id));
      removeItem();
    }
  };

  return (
    <S.Wrapper>
      <img src={item.product.imageUrl} alt={item.product.name} />
      <S.Name>{item.product.name}</S.Name>
      <S.RemoveButton onClick={handleRemoveFromCart(item.id)}>
        <BsFillTrash3Fill size={24} />
      </S.RemoveButton>
      <QuantityInput
        id={String(item.id)}
        value={item.quantity}
        onChange={handleNumberInputChange}
        onIncrement={handleIncreaseItem}
        onDecrement={handleDecreaseCartItem}
      />
      <S.Price>{(item.product.price * item.quantity).toLocaleString()}원</S.Price>
    </S.Wrapper>
  );
};

export default CartListItem;
