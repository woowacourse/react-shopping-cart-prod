import * as Styled from './ProductItem.styles.tsx';
import ShoppingCartLogo from '../@common/ShoppingCartLogo/ShoppingCartLogo';
import { Item } from '../../types/CartList.ts';
import StepperInput from '../@common/StepperInput/StepperInput.tsx';
import useCartItemOperations from '../../hooks/useCartItemOperations.ts';

export type ProductItemProps = {
  cartItem?: Item;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  refetchCartList: ({}) => void;
};

const ProductItem = ({ cartItem: cartItemProp, id, name, price, imageUrl, refetchCartList }: ProductItemProps) => {
  const { handleAddToCartButton, handleStepperInputChange } = useCartItemOperations({
    cartItemNumber: cartItemProp?.id,
    id,
    name,
    price,
    imageUrl,
    refetchCartList,
  });

  const CartButton = () => {
    return (
      <Styled.CartButton onClick={handleAddToCartButton}>
        <ShoppingCartLogo isFlipped={true} width={24} height={22} fill='#AAAAAA' />
      </Styled.CartButton>
    );
  };

  return (
    <Styled.ProductItemWrapper data-cy='productItem'>
      <Styled.ImageOverflowContainer>
        <Styled.ImageContainer>
          <Styled.ProductItemImage src={imageUrl} />
        </Styled.ImageContainer>
      </Styled.ImageOverflowContainer>
      <Styled.ProductItemInfo>
        <Styled.ProductItemInfoUpperBoundary>
          <Styled.ProductItemTitle>{name}</Styled.ProductItemTitle>
          {cartItemProp?.quantity ? <StepperInput value={cartItemProp?.quantity || 0} onChange={handleStepperInputChange} /> : <CartButton />}
        </Styled.ProductItemInfoUpperBoundary>
        <Styled.ProductItemPrice>{price.toLocaleString()}원</Styled.ProductItemPrice>
      </Styled.ProductItemInfo>
    </Styled.ProductItemWrapper>
  );
};

export default ProductItem;
