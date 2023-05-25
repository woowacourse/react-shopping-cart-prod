import * as Styled from './ListPage.styles.tsx';
import ProductItem from '../../components/ProductItem/ProductItem.tsx';
import useGetCartList from '../../hooks/requests/useGetCartList.ts';
import useGetProductList from '../../hooks/requests/useGetProductList.ts';
import { useRecoilValue } from 'recoil';

import { useEffect } from 'react';
import { serverAtom } from '../../stores/serverStore.ts';

const ListPage = () => {
  const { data: productListData, refetchProductList } = useGetProductList();
  const { data: cartListData, refetchCartList } = useGetCartList();
  const serverName = useRecoilValue(serverAtom);

  useEffect(() => {
    refetchProductList({});
  }, [serverName]);

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
