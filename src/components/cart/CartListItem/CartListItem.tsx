import { styled } from 'styled-components';
import Image from '../../common/Image/Image';
import Counter from '../../common/Counter/Counter';
import Checkbox from '../../common/Checkbox/Checkbox';
import useCart from '../../../hooks/useCart';
import { formatPrice } from '../../../utils/formatPrice';
import Spacer from '../../common/Spacer/Spacer';
import { TrashIcon } from '../../../assets/svg';
import type { CartItem } from '../../../types/cart';

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
  const { updateProductQuantity, removeProductFromCart } = useCart();

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
            <TrashIcon />
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
  font-family: 'Noto Sans KR';
  font-size: ${(props) => props.theme.fontSize.X_LARGE};
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.color.BLACK};

  @media only screen and (max-width: 600px) {
    font-size: ${(props) => props.theme.fontSize.MEDIUM};
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
`;

const Price = styled.p`
  font-family: 'Noto Sans KR';
  font-size: ${(props) => props.theme.fontSize.LARGE};
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.color.BLACK};
`;

export default CartListItem;
