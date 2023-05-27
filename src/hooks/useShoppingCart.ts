import { useRecoilState } from 'recoil';
import { cartProductIdStoreState } from 'state/cartProductIdStore';
import { cartProductsState } from 'state/cartProducts';
import { addCartProducts, updateCartProductsQuantity, removeCartProduct } from 'apis/cart';
import type { CheckedCartProducts, Product } from 'types/product';

const useShoppingCart = () => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsState);
  const [cartProductIdStore, setCartProductIdStore] = useRecoilState(cartProductIdStoreState);

  const initialAddCart = async (product: Product) => {
    try {
      const cartProductId = await addCartProducts(product.id);

      setCartProductIdStore((prev) => ({ ...prev, [product.id]: cartProductId }));

      setCartProducts((prev) => {
        const newCartProducts = new Map(prev.entries());

        return newCartProducts.set(cartProductId, { quantity: 1, product });
      });
    } catch (error) {
      console.error(error);
      alert('상품을 추가하지 못했어요. 다시 시도해주세요');
      return;
    }
  };

  const decreaseQuantity = async (id: Product['id']) => {
    const targetCartProduct = cartProducts.get(cartProductIdStore[id]);
    if (!targetCartProduct) return;

    const prevQuantity = targetCartProduct.quantity;

    if (prevQuantity === 1) {
      await deleteCartProduct(id);
      return;
    }

    try {
      await updateCartProductsQuantity(prevQuantity - 1, cartProductIdStore[id]);
    } catch (error) {
      console.error(error);
      alert('수량을 변경하지 못했어요. 다시 시도해주세요');
      return;
    }

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
    if (!targetCartProduct) return;

    const prevQuantity = targetCartProduct.quantity;

    try {
      await updateCartProductsQuantity(prevQuantity + 1, cartProductIdStore[id]);
    } catch (error) {
      console.error(error);
      alert('수량을 변경하지 못했어요. 다시 시도해주세요');
      return;
    }

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
    if (!targetCartProduct) return;

    try {
      await removeCartProduct(cartProductIdStore[id]);
    } catch (error) {
      console.error(error);
      alert('상품을 삭제하지 못했어요. 다시 시도해주세요');
      return;
    }

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
