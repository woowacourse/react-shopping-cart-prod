import { fetchCartItems, fetchProducts } from "../api";
import { MIN_QUANTITY } from "../constants";
import {
  CartItemType,
  Coupon,
  LocalProductType,
  Order,
  ProductType,
} from "../types/domain";

export const makeLocalProducts = async (): Promise<LocalProductType[]> => {
  try {
    const products = await fetchProducts();
    const cartItems = await fetchCartItems();

    return products.map((product: ProductType) => {
      const cartItem = cartItems.find(
        (cartItem: CartItemType) => cartItem.product.id === product.id
      );
      return {
        ...product,
        quantity: cartItem ? cartItem.quantity : MIN_QUANTITY,
        cartItemId: cartItem ? cartItem.id : null,
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const parseExpiredDate = (coupons: Coupon[]) => {
  if (coupons.length === 0) return coupons;

  const parsedCoupons = coupons.map((coupon) => {
    const expiredAt = coupon.expiredAt.split("T")[0];
    return { ...coupon, expiredAt };
  });

  return parsedCoupons;
};

export const parseOrderListData = (
  couponId: number | null,
  orderList: LocalProductType[]
): Order => {
  const parsedProductList = orderList.map((orderProduct) => {
    const cartItemId = orderProduct.cartItemId;
    const quantity = orderProduct.quantity;
    const name = orderProduct.name;
    const price = orderProduct.price;
    const imageUrl = orderProduct.imageUrl;

    return { cartItemId, quantity, name, price, imageUrl };
  });

  return {
    couponId: couponId,
    products: parsedProductList,
  };
};
