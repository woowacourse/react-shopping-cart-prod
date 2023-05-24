import * as S from './ProductItem.styles';
import Svg from 'components/@common/Svg';
import Counter from 'components/@common/Counter';
import { useCart } from 'components/Cart/hooks/useCart';
import { Product } from 'types';
import { useRecoilValue } from 'recoil';
import { cartListAtom } from 'recoil/cartList';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { removeItem, addItem, onSelectItem } = useCart(product);
  const cartList = useRecoilValue(cartListAtom);
  const currentCartItem = cartList.find(
    (cartItem) => cartItem.product.id === product.id
  );

  return (
    <S.ItemWrapper>
      <S.ItemImage src={product.imageUrl} alt={product.name} />
      <S.ProductWrapper>
        <div>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>
            {product.price.toLocaleString('KR')} 원
          </S.ProductPrice>
        </div>
        {currentCartItem ? (
          <Counter
            count={currentCartItem.quantity}
            min={0}
            increment={() => addItem(currentCartItem.id)}
            decrement={() => removeItem(currentCartItem.id)}
          />
        ) : (
          <Svg type="cart-icon" width={25} height={22} onClick={onSelectItem} />
        )}
      </S.ProductWrapper>
    </S.ItemWrapper>
  );
};

export default ProductItem;
