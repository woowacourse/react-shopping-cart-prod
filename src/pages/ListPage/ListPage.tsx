import * as Styled from './ListPage.styles.tsx';
import ProductItem from '../../components/ProductItem/ProductItem.tsx';
import useGetCartList from '../../hooks/requests/useGetCartList.ts';
import useGetProductList from '../../hooks/requests/useGetProductList.ts';
import { useEffect } from 'react';
import useSetCartListStoreFromServer from '../../hooks/useSetCartListStoreFromServer.ts';

const ListPage = () => {
  const { data: productListData } = useGetProductList();
  const { data: cartListData, status: cartListFetchingStatus, refetchCartList } = useGetCartList();
  const { setCartListStoreFromServer } = useSetCartListStoreFromServer();

  useEffect(() => {
    if (cartListFetchingStatus === 'success' && cartListData) {
      setCartListStoreFromServer(cartListData);
    }
  }, [cartListFetchingStatus]);

  return (
    <Styled.ProductList>
      {productListData &&
        cartListData &&
        productListData.map((product) => {
          const cartItem = cartListData.find((cartItem) => cartItem.product.id === product.id);
          return <ProductItem key={product.id} cartItem={cartItem} refetchCartList={refetchCartList} {...product} />;
        })}
    </Styled.ProductList>
  );
};

export default ListPage;
