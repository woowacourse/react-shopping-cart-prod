import * as Styled from './ProductItem.styles.tsx';
import ShoppingCartLogo from '../@common/ShoppingCartLogo/ShoppingCartLogo';
import { Item } from '../../types/CartList.ts';
import useCartItemOperations from '../../hooks/cartItemOperations/useCartItemOperations.ts';
import StepperInput from '../@common/StepperInput/StepperInput.tsx';

export type ProductItemProps = {
  cartItem?: Item;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  refetchCartList: ({}) => void;
  onImageLoad: () => void;
};

const ProductItem = ({ cartItem: cartItemProp, id, name, price, imageUrl, refetchCartList, onImageLoad }: ProductItemProps) => {
  const { handleAddToCartButton } = useCartItemOperations({
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
          <Styled.ProductItemImage src={imageUrl} onLoad={onImageLoad} />
        </Styled.ImageContainer>
      </Styled.ImageOverflowContainer>
      <Styled.ProductItemInfo>
        <Styled.ProductItemInfoUpperBoundary>
          <Styled.ProductItemTitle>{name}</Styled.ProductItemTitle>
          {cartItemProp?.quantity ? <StepperInput initialValue={cartItemProp?.quantity || 0} cartItem={cartItemProp} refetchCartList={refetchCartList} usedplace='listPage' /> : <CartButton />}
        </Styled.ProductItemInfoUpperBoundary>
        <Styled.ProductItemPrice>{price.toLocaleString()}원</Styled.ProductItemPrice>
      </Styled.ProductItemInfo>
    </Styled.ProductItemWrapper>
  );
};

export default ProductItem;
