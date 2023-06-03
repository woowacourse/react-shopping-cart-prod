import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hostNameAtom } from '../recoil/hostData';
import {
  checkedItemAtom,
  totalPriceSelector,
} from '../recoil/checkedProductData';
import { cartProductAtom } from '../recoil/cartProductData';
import { orderApi } from '../apis/orderProducts';
import useErrorState from './useErrorState';
import {
  FREE_DELIVERY_THRESHOLD,
  REWARD_POINT_RATE,
  STANDARD_DELIVERY_FEE,
} from '../constants/price';
import type { OrderedData } from '../types/product';

const useEstimatedPayment = (usePoint: number) => {
  const navigate = useNavigate();
  const { handleError } = useErrorState();
  const totalProductPrice = useRecoilValue(totalPriceSelector);
  const totalDeliveryFee =
    totalProductPrice === 0 || totalProductPrice >= FREE_DELIVERY_THRESHOLD
      ? 0
      : STANDARD_DELIVERY_FEE;
  const rewardPoints = totalProductPrice * REWARD_POINT_RATE;
  const totalPrice = totalProductPrice
    ? totalProductPrice + totalDeliveryFee - usePoint
    : 0;

  const checkedCartProduct = useRecoilValue(checkedItemAtom);
  const hostName = useRecoilValue(hostNameAtom);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);

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

    orderApi(hostName)
      .then((apiInstance) => {
        return apiInstance.postOrderProduct(orderData);
      })
      .then(() => {
        setCartProducts([]);
        navigate('/order-complete');
      })
      .catch((error) => {
        handleError(error);
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
