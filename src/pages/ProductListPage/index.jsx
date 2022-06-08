import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as cartThunk from 'actions/cart/thunk';
import * as productsThunk from 'actions/products/thunk';

import useCart from 'hooks/useCart';
import useDispatchEvent from 'hooks/useDispatchEvent';

import { StatusMessage } from 'components/@common';
import { SwitchAsync, Case } from 'components/@common/SwitchAsync';

import ProductItem from 'components/ProductItem';

import * as S from './styles';

export function ProductListPage() {
  const { dispatch, getRecentState } = useDispatchEvent();

  const productState = useSelector((state) => state.products);
  const { productList, listAsyncState: productsAsyncState } = productState;

  const { state: cartState } = useCart();
  const { cartItems } = cartState;

  useEffect(() => {
    dispatch(productsThunk.getList());
  }, []);

  const handleAddCart = async ({ id, image, name, price }) => {
    await dispatch(cartThunk.addList({ id, image, name, price }));
    const newCurdAsyncState = getRecentState('cart', 'curdAsyncState');
    newCurdAsyncState.isLoaded === false &&
      alert(`장바구니 상품 추가에 실패하였습니다.\n오류 내용 : ${newCurdAsyncState.error}`);
  };

  const handleRemoveCart = async ({ id }) => {
    await dispatch(cartThunk.removeItem(id));
    const newCurdAsyncState = getRecentState('cart', 'curdAsyncState');
    newCurdAsyncState.isLoaded === false &&
      alert(`장바구니 상품 추가에 실패하였습니다.\n오류 내용 : ${newCurdAsyncState.error}`);
  };

  return (
    <SwitchAsync
      isLoading={productsAsyncState.isLoading}
      isError={!!productsAsyncState.errorMessage}
      isContentLoaded={productList.length > 0}
    >
      <Case.Success>
        <S.Container>
          {productList &&
            productList.map(({ id, name, price, imageUrl }) => {
              const cartItem = cartItems.find(({ product }) => product === id);

              return (
                <ProductItem
                  key={id}
                  id={id}
                  image={imageUrl}
                  name={name}
                  price={price}
                  cartId={cartItem ? cartItem.id : null}
                  onClickCartButton={
                    cartItem ? () => handleRemoveCart({ id: cartItem.id }) : handleAddCart
                  }
                />
              );
            })}
        </S.Container>
      </Case.Success>

      <Case.Loading>
        <StatusMessage status="loading">상품 목록을 불러오고 있습니다.</StatusMessage>
      </Case.Loading>

      <Case.Error>
        <StatusMessage status="error">{productsAsyncState.errorMessage}</StatusMessage>
      </Case.Error>
    </SwitchAsync>
  );
}
export default ProductListPage;
