import * as Styled from './CartSelectList.styles.tsx';
import CartItem from './CartItem/CartItem.tsx';
import useGetCartList from '../../../hooks/requests/useGetCartList.ts';
import { useRecoilValue } from 'recoil';
import { cartSelectedItemsSelector } from '../../../stores/cartListStore.ts';
import useCart from '../../../hooks/useCart.ts';
import { useEffect } from 'react';
import useSetCartListStoreFromServer from '../../../hooks/useSetCartListStoreFromServer.ts';
import EmptyCartComponent from '../../@common/EmptyComponent/EmptyCartComponent.tsx';

const CartSelectList = () => {
  const { data: cartList, status: cartListFetchingStatus, refetchCartList } = useGetCartList();
  const [selectedItemsCount, allItemsCount] = useRecoilValue(cartSelectedItemsSelector);
  const { selectAllItems } = useCart();
  const { setCartListStoreFromServer } = useSetCartListStoreFromServer();

  useEffect(() => {
    if (cartListFetchingStatus === 'success' && cartList) {
      setCartListStoreFromServer(cartList);
    }
  }, [cartListFetchingStatus]);

  return (
    <Styled.CartSelectListWrapper>
      {!cartList?.length && cartListFetchingStatus === 'success' && <EmptyCartComponent />}

      {cartList && cartList?.length > 0 && (
        <>
          <Styled.CartQuantityText>배송 상품 ({cartList.length})개</Styled.CartQuantityText>
          <Styled.CartQuantityDivider />
          <div>
            <div>
              {cartList.map((cart) => {
                return <CartItem key={cart.id} cart={cart} refetchCartList={refetchCartList} />;
              })}
              <Styled.SelectAllButton onClick={selectAllItems}>전체선택</Styled.SelectAllButton>
              <span>
                ({selectedItemsCount}/{allItemsCount})
              </span>
            </div>
          </div>
        </>
      )}
    </Styled.CartSelectListWrapper>
  );
};
export default CartSelectList;
