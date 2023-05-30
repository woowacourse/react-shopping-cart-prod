import * as S from './CartItem.styles';
import Counter from 'components/@common/Counter';
import Svg from 'components/@common/Svg';
import { useCart } from 'components/Cart/hooks/useCart';
import { useCheckedItemIds } from '../hooks/useCheckedItems';
import { Cart } from 'types';
import Modal from 'components/@common/Modal';
import { useModal } from 'hooks/useModal';

interface CartItemProps {
  cartItem: Cart;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { decreaseItemQuantity, increaseItemQuantity, deleteItem } = useCart();
  const { checkItem, checkedItemIds, unCheckItem } = useCheckedItemIds();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { product } = cartItem;

  const onCheckItem = () => {
    checkItem(cartItem.id);
  };

  const onDelete = () => {
    deleteItem(cartItem.id);
    unCheckItem(cartItem.id);

    closeModal();
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
        <button onClick={openModal}>
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
      <Modal
        message={`${product.name}을(를) 삭제하시겠습니까?`}
        isOpen={isModalOpen}
        onCloseModal={closeModal}
        onClickYes={onDelete}
      />
    </S.CartItemWrapper>
  );
};

export default CartItem;
