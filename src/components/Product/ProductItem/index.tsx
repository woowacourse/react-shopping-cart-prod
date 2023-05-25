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
  const { decreaseItemQuantity, addItem, increaseItemQuantity } = useCart();
  const cartList = useRecoilValue(cartListAtom);
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
            {product.price.toLocaleString('KR')} 원
          </S.ProductPrice>
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
