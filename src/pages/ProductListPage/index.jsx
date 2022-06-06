import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import cartThunk from 'store/cart/thunk';
import productThunk from 'store/product/thunk';

import useCart from 'hooks/useCart';
import useDispatchEvent from 'hooks/useDispatchEvent';

import { StatusMessage } from 'components/@common';
import { SwitchAsync, Case } from 'components/@common/SwitchAsync';

import ProductItem from 'components/ProductItem';

import * as S from './styles';

export function ProductListPage() {
  const { dispatch, dispatchEvent } = useDispatchEvent();

  const productState = useSelector(({ product }) => product);
  const { productList, listAsyncState: productsAsyncState } = productState;

  const { cartState } = useCart();
  const { items: cartItems } = cartState;

  useEffect(() => {
    dispatch(productThunk.updateList());
  }, []);

  const handleAddCart = ({ id, image, name, price }) => {
    dispatchEvent({
      action: cartThunk.addItem({ id, image, name, price }),
      onStateUpdated: ({ cart }) => {
        const { curdAsyncState } = cart;
        !curdAsyncState.isLoaded &&
          alert(`장바구니 상품 추가에 실패하였습니다.\n오류 내용 : ${curdAsyncState.error}`);
      },
    });
  };

  const handleRemoveCart = ({ id }) => {
    dispatchEvent({
      action: cartThunk.removeItem(id),
      onStateUpdated: ({ cart }) => {
        const { curdAsyncState } = cart;
        !curdAsyncState.isLoaded &&
          alert(`장바구니 상품 제거에 실패하였습니다.\n오류 내용 : ${curdAsyncState.error}`);
      },
    });
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
            productList.map(({ id, name, goodsPrice, listImage }) => {
              const cartItem = cartItems.find(({ product }) => product === id);

              return (
                <ProductItem
                  key={id}
                  id={id}
                  image={listImage}
                  name={name}
                  price={goodsPrice}
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
