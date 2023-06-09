import * as S from './CartItem.styles';
import Counter from 'components/@common/Counter';
import Svg from 'components/@common/Svg';
import { useCart } from 'components/Cart/hooks/useCart';
import { useCheckedItemIds } from '../hooks/useCheckedItems';
import Modal from 'components/@common/Modal';
import { useModal } from 'hooks/useModal';
import { CartItem as CartItemType } from 'types/api/carts';

interface CartItemProps {
  cartItem: CartItemType;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { decreaseItemQuantity, increaseItemQuantity, deleteItem } = useCart();
  const { checkItem, checkedItemIds, unCheckItem } = useCheckedItemIds();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { product, id: cartItemId, quantity } = cartItem;
  const { name, isOnSale, price, salePrice, imageUrl } = product;
  const finalPrice = isOnSale ? price - salePrice : price;
  const salePercentage = ((salePrice / price) * 100).toFixed(0);

  const onCheckItem = () => {
    checkItem(cartItemId);
  };

  const onDelete = () => {
    deleteItem(cartItemId);
    unCheckItem(cartItemId);

    closeModal();
  };

  const increase = () => {
    increaseItemQuantity(cartItemId);
  };

  const decrease = () => {
    decreaseItemQuantity(cartItemId);
  };

  return (
    <S.CartItemWrapper>
      <S.CheckBox
        type="checkbox"
        onChange={onCheckItem}
        checked={checkedItemIds.includes(cartItemId)}
      />
      <S.CartItemImage src={imageUrl} alt={name} />
      <S.CartProductName>{name}</S.CartProductName>
      <S.CounterWrapper>
        <button onClick={openModal}>
          <Svg type="trash-can" width={24} height={24} />
        </button>
        <Counter
          count={quantity}
          min={1}
          increment={increase}
          decrement={decrease}
        />
        <S.FinalPrice>{finalPrice.toLocaleString('KR')}원</S.FinalPrice>
        {isOnSale && (
          <S.SalePriceBox>
            <S.SalePercentage>{salePercentage}% </S.SalePercentage>
            <S.OriginalPrice>{price.toLocaleString('KR')} 원</S.OriginalPrice>
          </S.SalePriceBox>
        )}
      </S.CounterWrapper>
      <Modal
        message={`${name}을(를) 삭제하시겠습니까?`}
        isOpen={isModalOpen}
        onCloseModal={closeModal}
        onClickYes={onDelete}
      />
    </S.CartItemWrapper>
  );
};

export default CartItem;
