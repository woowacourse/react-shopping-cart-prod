import * as Styled from './ListPage.styles.tsx';
import ProductItem from '../../components/ProductItem/ProductItem.tsx';
import useGetCartList from '../../hooks/requests/useGetCartList.ts';
import useGetProductList from '../../hooks/requests/useGetProductList.ts';
import { useEffect, useState } from 'react';
import useSetCartListStoreFromServer from '../../hooks/useSetCartListStoreFromServer.ts';
import ProductItemSkeleton from '../../components/@common/SkeletonUI/ProducItemSkeleton/ProductItemSkeleton.tsx';

const ListPage = () => {
  const { data: productListData, status: productListFetchingStatus } = useGetProductList();
  const { data: cartListData, status: cartListFetchingStatus, refetchCartList } = useGetCartList();
  const { setCartListStoreFromServer } = useSetCartListStoreFromServer();
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    if (cartListFetchingStatus === 'success' && cartListData) {
      setCartListStoreFromServer(cartListData);
    }
  }, [cartListFetchingStatus]);

  const handleImageLoad = () => {
    setLoadedImages((prevCount) => prevCount + 1);
  };

  const isAllImagesLoaded = productListData && loadedImages >= productListData?.length;

  return (
    <Styled.ProductList>
      {/*
        fetching status 'lodaing' 혹은 fetching 이후 하위 컴포넌트 img tag 가 onLoad status 가 아닐 시 ProductItemSkeleton을 10개 렌더링한다.
      */}
      {(productListFetchingStatus === 'loading' || !isAllImagesLoaded) && Array.from({ length: 10 }, (_, index) => <ProductItemSkeleton key={index} />)}

      {productListData &&
        cartListData &&
        productListData.map((product) => {
          const cartItem = cartListData.find((cartItem) => cartItem.product.id === product.id);
          return <ProductItem key={product.id} cartItem={cartItem} refetchCartList={refetchCartList} onImageLoad={handleImageLoad} {...product} />;
        })}
    </Styled.ProductList>
  );
};

export default ListPage;
