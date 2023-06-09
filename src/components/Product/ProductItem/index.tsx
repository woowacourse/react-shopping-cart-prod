import * as S from './ProductItem.styles';
import Svg from 'components/@common/Svg';
import Counter from 'components/@common/Counter';
import { useCart } from 'components/Cart/hooks/useCart';
import { ProductItem as ProductItemType } from 'types/api/products';
import useProductItem from '../hooks/useProductItem';

interface ProductItemProps {
  product: ProductItemType;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { name, isOnSale, price, imageUrl } = product;
  const { productInCart, finalPrice, salePercentage } = useProductItem(product);
  const { decreaseItemQuantity, addItem, increaseItemQuantity } = useCart();

  const increase = () => {
    if (!productInCart) return;
    increaseItemQuantity(productInCart.id);
  };

  const decrease = () => {
    if (!productInCart) return;
    decreaseItemQuantity(productInCart.id);
  };

  const onAddItem = () => {
    addItem(product);
  };

  return (
    <S.ItemWrapper>
      <S.ItemImage src={imageUrl} alt={name} />
      <S.ProductWrapper>
        <div>
          <S.ProductName>{name}</S.ProductName>
          <S.ProductPrice>{finalPrice.toLocaleString('KR')} 원</S.ProductPrice>
          {isOnSale && (
            <S.SalePriceBox>
              <S.SalePercentage>{salePercentage}% </S.SalePercentage>
              <S.ProductOriginalPrice>
                {price.toLocaleString('KR')} 원
              </S.ProductOriginalPrice>
            </S.SalePriceBox>
          )}
        </div>
        {productInCart ? (
          <Counter
            count={productInCart.quantity}
            min={0}
            increment={increase}
            decrement={decrease}
          />
        ) : (
          <Svg type="cart-icon" width={25} height={22} onClick={onAddItem} />
        )}
      </S.ProductWrapper>
    </S.ItemWrapper>
  );
};

export default ProductItem;
