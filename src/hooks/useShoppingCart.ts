import { useRecoilState } from 'recoil';
import { cartProductIdStoreState } from 'state/cartProductIdStore';
import { cartProductsState } from 'state/cartProducts';
import { addCartProducts, updateCartProductsQuantity, removeCartProduct } from 'apis/cart';
import type { CheckedCartProducts, Product } from 'types/product';

const useShoppingCart = () => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsState);
  const [cartProductIdStore, setCartProductIdStore] = useRecoilState(cartProductIdStoreState);

  const initialAddCart = async (product: Product) => {
    const cartProductId = await addCartProducts(product.id);

    setCartProductIdStore((prev) => ({ ...prev, [product.id]: cartProductId }));

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(cartProductId, { quantity: 1, product });
    });
  };

  const decreaseQuantity = async (id: Product['id']) => {
    const targetCartProduct = cartProducts.get(cartProductIdStore[id]);
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    const prevQuantity = targetCartProduct.quantity;

    if (prevQuantity === 1) {
      await deleteCartProduct(id);
      return;
    }

    await updateCartProductsQuantity(prevQuantity - 1, cartProductIdStore[id]);

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(cartProductIdStore[id], {
        quantity: prevQuantity - 1,
        product: targetCartProduct.product,
      });
    });
  };

  const increaseQuantity = async (id: Product['id']) => {
    const targetCartProduct = cartProducts.get(cartProductIdStore[id]);
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    const prevQuantity = targetCartProduct.quantity;

    await updateCartProductsQuantity(prevQuantity + 1, cartProductIdStore[id]);

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(cartProductIdStore[id], {
        quantity: prevQuantity + 1,
        product: targetCartProduct.product,
      });
    });
  };

  const deleteCartProduct = async (id: Product['id']) => {
    const targetCartProduct = cartProducts.get(cartProductIdStore[id]);
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    await removeCartProduct(cartProductIdStore[id]);

    setCartProductIdStore((prev) => {
      const { [id]: cartProductId, ...otherIds } = prev;

      return { ...otherIds };
    });

    setCartProducts((prev) => {
      prev.delete(cartProductIdStore[id]);

      return new Map(prev.entries());
    });
  };

  const deleteCheckedCartProducts = (checkedCartProducts: CheckedCartProducts) => {
    [...checkedCartProducts].forEach(async (productCartId) => {
      const productId = Object.keys(cartProductIdStore).find((productId) => {
        return cartProductIdStore[Number(productId)] === productCartId;
      });

      await deleteCartProduct(Number(productId));
    });
  };

  return {
    cartProducts,
    initialAddCart,
    increaseQuantity,
    decreaseQuantity,
    deleteCartProduct,
    deleteCheckedCartProducts,
  };
};

export default useShoppingCart;
