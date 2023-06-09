import { styled } from 'styled-components';
import ProductListItem from '../components/ProductListItem';
import LoadingPlaceholder from '../components/common/LoadingPlaceholder';
import AwaitRecoilState from '../components/utils/AwaitRecoilState';
import ResponseErrorBoundary from '../components/utils/ResponseErrorBoundary';
import userCartItemsRepository from '../recoil/user/userCartItemsRepository';
import userProductsState from '../recoil/user/userProductsState';

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 230px);
  column-gap: 48px;
  row-gap: 80px;
  justify-content: center;

  @media screen and (max-width: 1140px) {
    grid-template-columns: repeat(3, 230px);
  }

  @media screen and (max-width: 840px) {
    grid-template-columns: repeat(2, 230px);
  }

  @media screen and (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProductListPage = () => {
  return (
    <AwaitRecoilState
      state={userProductsState}
      loadingElement={<LoadingPlaceholder title="제품 목록을 가져오는 중입니다 ..." />}
    >
      {(products) => (
        <ResponseErrorBoundary
          catches={(response) => response.accept(401)}
          fallback={
            <ProductList>
              {products.map((product) => (
                <ProductListItem key={product.id} product={product} showCartItem={false} />
              ))}
            </ProductList>
          }
        >
          <AwaitRecoilState
            state={userCartItemsRepository}
            loadingElement={<LoadingPlaceholder title="장바구니 정보를 가져오는 중입니다 ..." />}
          >
            {({ getCartItemByProductId, setQuantity }) => (
              <ProductList>
                {products.map((product) => (
                  <ProductListItem
                    key={product.id}
                    product={product}
                    cartItem={getCartItemByProductId(product.id)}
                    onChangeQuantity={(quantity) => setQuantity(product, quantity)}
                  />
                ))}
              </ProductList>
            )}
          </AwaitRecoilState>
        </ResponseErrorBoundary>
      )}
    </AwaitRecoilState>
  );
};

export default ProductListPage;
