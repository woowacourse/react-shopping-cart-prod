import { useRecoilValue } from 'recoil';

import productsState from '@Atoms/productsState';

import ProductItem from '../ProductItem';

function ProductList() {
  const data = useRecoilValue(productsState);

  return (
    <>
      {data?.map((data) => (
        <ProductItem product={data} key={data.id} />
      ))}
    </>
  );
}

export default ProductList;
