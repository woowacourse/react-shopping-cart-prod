import * as Styled from './CartItem.styles.tsx';
import StepperInput from '../../../@common/StepperInput/StepperInput.tsx';
import { Item } from '../../../../types/CartList.ts';
import useCart from '../../../../hooks/useCart.ts';
import useDeleteCartItem from '../../../../hooks/requests/useDeleteCartItem.ts';
import StyledCheckBox from '../../../@common/CheckBox/StyledCheckBox.tsx';
import { useRecoilValue } from 'recoil';
import { isSelectedSelector } from '../../../../stores/cartListStore.ts';
import toastMessages from '../../../../constants/toastMessages.ts';
import { useToast } from '../../../../hooks/useToast.ts';

type CartItemProps = {
  cart: Item;
  refetchCartList: ({}) => void;
};

const CartItem = ({ cart, refetchCartList }: CartItemProps) => {
  const { product } = cart;
  const isSelected = useRecoilValue(isSelectedSelector(cart.id));
  const { toggleIsSelected, updateCart } = useCart();
  const { deleteCartItem } = useDeleteCartItem();
  const showToast = useToast();

  const handleDeleteButton = async () => {
    await deleteCartItem({ param: cart.id });
    await refetchCartList({});
    updateCart({ id: cart.id, isSelected: false, quantity: 0, product: cart.product });
    showToast(toastMessages.deleted);
  };

  const handleCheckBox = () => {
    toggleIsSelected(cart.id);
  };

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
            <StepperInput initialValue={cart.quantity} cartItem={cart} refetchCartList={refetchCartList} usedplace='cartPage' />
            <span>{product.price.toLocaleString()}원</span>
          </Styled.itemFunctionWrapper>
        </Styled.CartItem>
      </ul>
      <Styled.CartItemBorder />
    </>
  );
};

export default CartItem;
