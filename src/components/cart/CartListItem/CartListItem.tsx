import { styled } from 'styled-components';
import Image from '../../common/Image/Image';
import Counter from '../../common/Counter/Counter';
import Checkbox from '../../common/Checkbox/Checkbox';
import useCartService from '../../../hooks/useCartService';
import { formatPrice } from '../../../utils/formatPrice';
import Spacer from '../../common/Spacer/Spacer';
import { HiOutlineTrash } from 'react-icons/hi';
import colors from '../../../colors';
import type { CartItem } from '../../../types/product';

interface CartListItemProps {
  cartItem: CartItem;
  checked?: boolean;
  onChangeCheckbox?: (id: number) => void;
}

const CartListItem = ({
  cartItem,
  checked = false,
  onChangeCheckbox,
}: CartListItemProps) => {
  const { id: cartItemId, quantity, product } = cartItem;
  const { name, price, imageUrl } = product;
  const { updateProductQuantity, removeProductFromCart } = useCartService();

  const handleChangeQuantity = (quantity: number) => {
    updateProductQuantity(cartItemId, quantity);
  };

  const handleRemoveProduct = (quantity: number) => {
    if (quantity === 0) {
      removeProductFromCart(cartItemId);
    }
  };

  return (
    <Container>
      <Inner>
        <Contents>
          <Checkbox
            id={String(cartItemId)}
            checked={checked}
            onChange={onChangeCheckbox}
          />
          <Spacer width={15} />
          <Image src={imageUrl} loading="lazy" alt={name} />
          <Title>{name}</Title>
        </Contents>
        <Right>
          <DeleteButton
            type="button"
            aria-label="장바구니에서 삭제하기"
            onClick={() => removeProductFromCart(cartItemId)}
          >
            <HiOutlineTrash />
          </DeleteButton>
          <Counter
            count={quantity}
            onChange={handleChangeQuantity}
            onBlur={handleRemoveProduct}
          />
          <Price>{formatPrice(quantity * price)}</Price>
        </Right>
      </Inner>
    </Container>
  );
};

const Container = styled.li`
  height: 203px;

  @media only screen and (max-width: 600px) {
    height: 260px;
  }
`;

const Inner = styled.div`
  display: flex;
  padding-top: 23px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    row-gap: 40px;
  }
`;

const Contents = styled.div`
  display: flex;
`;

const Title = styled.p`
  margin-left: 20px;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${colors.lightGold};

  @media only screen and (max-width: 600px) {
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 145px;
  margin-left: auto;

  @media only screen and (max-width: 600px) {
    flex-direction: row;
    height: 20px;
    margin: 0;
    align-items: center;
  }
`;

const DeleteButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  & * {
    color: ${colors.red};
    font-size: 26px;
  }
`;

const Price = styled.p`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${colors.lightGold};
`;

export default CartListItem;
