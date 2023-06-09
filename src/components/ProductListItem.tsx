import { styled } from 'styled-components';
import CartIcon from '../assets/icons/cart.svg';
import type { CartItem } from '../types/CartItem';
import type { Product } from '../types/Product';
import PriceFormat from './common/PriceFormat';
import Stepper from './common/Stepper';

const ProductListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductInfo = styled.div`
  flex: 1;
  padding: 18px 8px;
  padding-bottom: 0;
`;

const ProductImage = styled.img`
  background: gray;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex: 1;

  & > *:last-child {
    margin-left: auto;
  }
`;

const ProductName = styled.p`
  font-size: 16px;
`;

const ProductPrice = styled.p`
  font-size: 20px;
`;

const StepperContainer = styled.div`
  padding: 18px 0px;
`;

const AddCartButton = styled.button`
  padding: 0 10px 10px 10px;
`;

type ProductListItemProps = {
  product: Product;
  cartItem?: CartItem | null;
  showCartItem?: boolean;
  onChangeQuantity?: (quantity: number) => void;
};

const ProductListItem = (props: ProductListItemProps) => {
  const { product, cartItem, showCartItem = true, onChangeQuantity } = props;

  return (
    <ProductListItemContainer>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <ProductInfoContainer>
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>
            <PriceFormat price={product.price} />
          </ProductPrice>
        </ProductInfo>
        <StepperContainer>
          {showCartItem &&
            (cartItem ? (
              <Stepper
                min={0}
                value={cartItem.quantity}
                onChange={(quantity) => onChangeQuantity?.(quantity)}
              />
            ) : (
              <AddCartButton onClick={() => onChangeQuantity?.(1)}>
                <img alt="카트" src={CartIcon} />
              </AddCartButton>
            ))}
        </StepperContainer>
      </ProductInfoContainer>
    </ProductListItemContainer>
  );
};

export default ProductListItem;
