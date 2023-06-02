import * as S from './ProductItem.styles';
import Svg from 'components/@common/Svg';
import Counter from 'components/@common/Counter';
import { useCart } from 'components/Cart/hooks/useCart';
import { useRecoilValue } from 'recoil';
import { cartListAtom } from 'recoil/carts';
import { ProductItem as ProductItemType } from 'types/api/products';

interface ProductItemProps {
  product: ProductItemType;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { id, name, isOnSale, salePrice, price, imageUrl } = product;
  const { decreaseItemQuantity, addItem, increaseItemQuantity } = useCart();
  const cartList = useRecoilValue(cartListAtom);
  const cartItem = cartList.find((cartItem) => cartItem.product.id === id);
  const finalPrice = isOnSale ? price - salePrice : price;
  const salePercentage = ((salePrice / price) * 100).toFixed(0);

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
