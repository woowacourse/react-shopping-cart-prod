import ProductCard from 'components/ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import { CartStoreState } from 'types';
import { getProductQuantityInCart } from 'utils/validator';

import * as S from './ProductCardGrid.styled';
import { Props } from './ProductCardGrid.type';

function ProductCardGrid({ productList }: Props) {
  const cart = useSelector(
    (state: { cart: CartStoreState }) => state.cart.cart
  );

  return (
    <S.ProductCardGrid>
      {productList.length > 0 ? (
        productList.map(product => (
          <ProductCard
            product={product}
            cartQuantity={getProductQuantityInCart(product.id, cart)}
            key={product.id}
          />
        ))
      ) : (
        <S.Message>상품이 없어요 😢</S.Message>
      )}
    </S.ProductCardGrid>
  );
}

export default ProductCardGrid;
