import { useRecoilValue } from 'recoil';

import useShoppingCart from '@Hooks/useCartItems';

import productsState from '@Atoms/productsState';

import ProductItem from '../ProductItem';

function ProductList() {
  const data = useRecoilValue(productsState);

  const { updateCartItem } = useShoppingCart();

  return (
    <>
      {data?.map((data) => (
        <ProductItem product={data} key={data.id} updateCartItem={updateCartItem} />
      ))}
    </>
  );
}

export default ProductList;
