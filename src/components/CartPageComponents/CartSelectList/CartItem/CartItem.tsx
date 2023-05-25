import * as Styled from './CartItem.styles.tsx';
import StepperInput from '../../StepperInput/StepperInput.tsx';
import { Item } from '../../../../types/CartList.ts';
import useCart from '../../../../hooks/useCart.ts';
import useDeleteCartItem from '../../../../hooks/requests/useDeleteCartItem.ts';
import StyledCheckBox from '../../../@common/CheckBox/StyledCheckBox.tsx';
import { useRecoilValue } from 'recoil';
import { isSelectedSelector } from '../../../../stores/cartListStore.ts';
import { useEffect } from 'react';

type CartItemProps = {
  cart: Item;
  refetchCartList: ({}) => void;
};

const CartItem = ({ cart, refetchCartList }: CartItemProps) => {
  const { product } = cart;
  const isSelected = useRecoilValue(isSelectedSelector(cart.id));
  const { removeCartItem, toggleIsSelected, updateCart } = useCart();
  const { deleteCartItemState, deleteCartItem } = useDeleteCartItem();

  const handleDeleteButton = async () => {
    await deleteCartItem({ param: cart.id });
    updateCart({ ...cart, isSelected: false, quantity: 0 });
    // removeCartItem(cart.id);
  };

  const handleCheckBox = () => {
    toggleIsSelected(cart.id);
  };

  const handleDeleteCartItem = async () => {
    await removeCartItem(cart.id);
    refetchCartList({});
  };

  useEffect(() => {
    if (deleteCartItemState.status === 'success') {
      handleDeleteCartItem();
    }
  }, [deleteCartItemState.status]);

  return (
    <>
      <ul>
        <Styled.CartItem>
          <StyledCheckBox checked={isSelected} onChange={handleCheckBox} />
          <Styled.ItemImageOverflowContainer>
            <Styled.ItemImageContainer>
              <Styled.ItemImage src={product.imageUrl} />
            </Styled.ItemImageContainer>
          </Styled.ItemImageOverflowContainer>
          <Styled.ItemTitle>{product.name}</Styled.ItemTitle>

          <Styled.itemFunctionWrapper>
            <Styled.DeleteButton onClick={handleDeleteButton}>
              <Styled.TrashLogo />
            </Styled.DeleteButton>
            <StepperInput initialValue={cart.quantity} cartItem={cart} refetchCartList={refetchCartList} />
            <span>{product.price.toLocaleString()}원</span>
          </Styled.itemFunctionWrapper>
        </Styled.CartItem>
      </ul>
      <Styled.CartItemBorder />
    </>
  );
};

export default CartItem;
