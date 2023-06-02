import * as S from './ProductItem.styles';
import Svg from 'components/@common/Svg';
import Counter from 'components/@common/Counter';
import { useCart } from 'components/Cart/hooks/useCart';
import { Product } from 'types';
import { calculateSalePercentage, formatPrice } from 'utils';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { cartList, decreaseItemQuantity, addItem, increaseItemQuantity } =
    useCart();

  const cartItem = cartList.find(
    (cartItem) => cartItem.product.id === product.id
  );

  const increase = () => {
    if (!cartItem) return;
    increaseItemQuantity(cartItem.id);
  };

  const decrease = () => {
    if (!cartItem) return;
    decreaseItemQuantity(cartItem.id);
  };

  const onAddItem = () => {
    addItem(product);
  };

  return (
    <S.ItemWrapper>
      <S.ItemImage src={product.imageUrl} alt={product.name} />
      <S.ProductWrapper>
        <div>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>
            {product.isOnSale && (
              <S.DiscountPercent>
                {calculateSalePercentage(product.price, product.salePrice)}%
              </S.DiscountPercent>
            )}
            {(product.price - product.salePrice).toLocaleString('KR')}원
          </S.ProductPrice>
          {product.isOnSale && (
            <S.DiscountPrice>{formatPrice(product.price)} 원</S.DiscountPrice>
          )}
        </div>
        {cartItem ? (
          <Counter
            count={cartItem.quantity}
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
