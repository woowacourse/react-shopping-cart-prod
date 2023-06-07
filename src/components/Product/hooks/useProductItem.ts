import { useRecoilValue } from 'recoil';
import { cartListAtom } from 'recoil/carts';
import { ProductItem } from 'types/api/products';

const useProductItem = (product: ProductItem) => {
  const { id, isOnSale, salePrice, price } = product;
  const cartList = useRecoilValue(cartListAtom);

  const productInCart = cartList.find((cartItem) => cartItem.product.id === id);

  const finalPrice = isOnSale ? price - salePrice : price;

  const salePercentage = ((salePrice / price) * 100).toFixed(0);

  return { productInCart, finalPrice, salePercentage };
};

export default useProductItem;
