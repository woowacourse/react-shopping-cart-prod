import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import DeleteIcon from '../assets/icons/delete.svg';
import userCartItemsRepository from '../recoil/user/userCartItemsRepository';
import type { Product } from '../types/Product';
import PriceFormat from './common/PriceFormat';
import Stepper from './common/Stepper';

const CartItemListItemContainer = styled.div`
  display: flex;
  gap: 20px;

  width: 100%;
`;

const ProductImage = styled.img`
  width: 140px;
  height: 140px;

  background: gray;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const ProductName = styled.h1`
  flex: 1;

  font-size: 20px;
  font-weight: 400;
  color: #333333;
`;

const CartController = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;

const DeleteButton = styled.button``;

type CartItemListItemProps = {
  quantity: number;
  product: Product;
};

const CartItemListItem = (props: CartItemListItemProps) => {
  const { quantity, product } = props;
  const { setQuantity } = useRecoilValue(userCartItemsRepository);

  const handleChangeQuantityWithinSafeRange = (newQuantity: number) => {
    setQuantity(product, Math.max(1, newQuantity));
  };

  return (
    <CartItemListItemContainer>
      <ProductImage src={product.imageUrl} />
      <ProductName>{product.name}</ProductName>

      <CartController>
        <DeleteButton onClick={() => setQuantity(product, 0)}>
          <img src={DeleteIcon} alt="삭제" />
        </DeleteButton>
        <Stepper variant="large" value={quantity} onChange={handleChangeQuantityWithinSafeRange} />
        <PriceFormat price={product.price * quantity} />
      </CartController>
    </CartItemListItemContainer>
  );
};

export default CartItemListItem;
