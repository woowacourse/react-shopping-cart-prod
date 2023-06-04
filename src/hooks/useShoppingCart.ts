import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartProductIdStoreState } from 'state/cartProductIdStore';
import { cartProductsState } from 'state/cartProducts';
import { postCartProducts, updateCartProductsQuantity, removeCartProduct } from 'apis/cart';
import type { CheckedCartProducts, Product } from 'types/product';
import { checkedCartProductIdsState } from 'state/checkedCartProductIds';

const useShoppingCart = () => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsState);
  const cartProductIdStore = useRecoilValue(cartProductIdStoreState);
  const setCheckedCartProductIds = useSetRecoilState(checkedCartProductIdsState);

  const initialAddCart = async (product: Product) => {
    try {
      const cartProductId = await postCartProducts(product.id);

      setCheckedCartProductIds((prev) => new Set(prev.add(cartProductId)));
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
      await removeCartProduct([cartProductIdStore[id]]);
    } catch (error) {
      console.error(error);
      alert('상품을 삭제하지 못했어요. 다시 시도해주세요');
      return;
    }

    setCartProducts((prev) => {
      prev.delete(cartProductIdStore[id]);

      return new Map(prev.entries());
    });
  };

  const deleteCheckedCartProducts = async (checkedCartProducts: CheckedCartProducts) => {
    try {
      await removeCartProduct([...checkedCartProducts]);
    } catch (error) {
      console.error(error);
      alert('상품을 삭제하지 못했어요. 다시 시도해주세요');
      return;
    }

    setCartProducts((prev) => {
      prev.clear();

      return new Map(prev.entries());
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
