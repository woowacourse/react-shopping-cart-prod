import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { orderApiAtom } from '../recoil/hostData';
import {
  checkedItemAtom,
  totalPriceSelector,
} from '../recoil/checkedProductData';
import { cartProductAtom } from '../recoil/cartProductData';
import {
  FREE_DELIVERY_THRESHOLD,
  REWARD_POINT_RATE,
  STANDARD_DELIVERY_FEE,
} from '../constants/price';
import type { OrderedData } from '../types/product';

const useEstimatedPayment = (usePoint: number) => {
  const navigate = useNavigate();
  const orderApiInstance = useRecoilValue(orderApiAtom);
  const totalProductPrice = useRecoilValue(totalPriceSelector);
  const totalDeliveryFee =
    totalProductPrice === 0 || totalProductPrice >= FREE_DELIVERY_THRESHOLD
      ? 0
      : STANDARD_DELIVERY_FEE;
  const rewardPoints = totalProductPrice * REWARD_POINT_RATE;
  const totalPrice = totalProductPrice
    ? totalProductPrice + totalDeliveryFee - usePoint
    : 0;
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);
  const [checkedCartProduct, setCheckedCartProduct] =
    useRecoilState(checkedItemAtom);

  const submitOrder = () => {
    const cartItems = cartProducts
      .filter((product) => checkedCartProduct.includes(product.cartItemId))
      .map(({ cartItemId, quantity, product }) => {
        return {
          cartItemId,
          quantity,
          product,
        };
      });

    const orderData: OrderedData = {
      cartItems,
      totalProductPrice,
      totalDeliveryFee,
      usePoint,
      totalPrice,
    };

    orderApiInstance
      .postOrderProduct(orderData)
      .then(() => {
        setCartProducts([]);
        setCheckedCartProduct([]);
        navigate('/orders/complete');
      })
      .catch(() => {
        navigate('/orders/fail');
      });
  };

  return {
    totalProductPrice,
    totalDeliveryFee,
    rewardPoints,
    usePoint,
    totalPrice,
    submitOrder,
  };
};

export default useEstimatedPayment;
