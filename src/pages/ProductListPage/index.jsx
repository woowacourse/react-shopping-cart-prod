import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

<<<<<<< HEAD
import cartThunk from 'store/cart/thunk';
import productThunk from 'store/product/thunk';
=======
import * as cartThunk from 'actions/cart/thunk';
import * as productsThunk from 'actions/products/thunk';
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854

import useCart from 'hooks/useCart';

import { StatusMessage } from 'components/@common';
import { SwitchAsync, Case } from 'components/@common/SwitchAsync';

import ProductItem from 'components/ProductItem';

import * as S from './styles';

export function ProductListPage() {
  const dispatch = useDispatch();

<<<<<<< HEAD
  const productState = useSelector(({ product }) => product);
  const { productList, listAsyncState: productsAsyncState } = productState;

  const { cartState } = useCart();
  const { items: cartItems, listAsyncState: cartListAsyncState } = cartState;

  useEffect(() => {
    dispatch(productThunk.updateList());
  }, []);

  const handleAddCart = ({ id, image, name, price }) => {
    dispatch(cartThunk.addItem({ id, image, name, price })).then(() => {
=======
  const productState = useSelector((state) => state.products);
  const { productList, listAsyncState: productsAsyncState } = productState;

  const { state: cartState } = useCart();
  const { cartItems, cartListAsyncState } = cartState;

  useEffect(() => {
    dispatch(productsThunk.getList());
  }, []);

  const handleAddCart = ({ id, image, name, price }) => {
    dispatch(cartThunk.addList({ id, image, name, price })).then(() => {
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854
      cartListAsyncState.isLoaded === false &&
        alert(`장바구니 상품 추가에 실패하였습니다.\n오류 내용 : ${cartListAsyncState.error}`);
    });
  };

  const handleRemoveCart = ({ id }) => {
    dispatch(cartThunk.removeItem(id)).then(() => {
      cartListAsyncState.isLoaded === false &&
        alert(`장바구니 상품 제거에 실패하였습니다.\n오류 내용 : ${cartListAsyncState.error}`);
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
