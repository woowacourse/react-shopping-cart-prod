import { useRecoilValue } from 'recoil';
import { hostNameAtom } from '../recoil/hostData';
import {
  checkedItemAtom,
  totalPriceSelector,
} from '../recoil/checkedProductData';
import { orderApi } from '../apis/orderProducts';
import {
  FREE_DELIVERY_THRESHOLD,
  REWARD_POINT_RATE,
  STANDARD_DELIVERY_FEE,
} from '../constants/price';
import type { OrderedData } from '../types/product';

const useEstimatedPayment = (usePoint: number) => {
  const totalProductPrice = useRecoilValue(totalPriceSelector);
  const totalDeliveryFee =
    totalProductPrice === 0 || totalProductPrice >= FREE_DELIVERY_THRESHOLD
      ? 0
      : STANDARD_DELIVERY_FEE;
  const totalPrice = totalProductPrice
    ? totalProductPrice + totalDeliveryFee
    : 0;
  const rewardPoints = totalProductPrice * REWARD_POINT_RATE;

  const checkedCartProduct = useRecoilValue(checkedItemAtom);
  const hostName = useRecoilValue(hostNameAtom);

  const submitOrder = () => {
    const cartItems = checkedCartProduct.map(
      ({ cartItemId, quantity, product }) => {
        return {
          cartItemId,
          quantity,
          product,
        };
      }
    );

    const orderData: OrderedData = {
      cartItems,
      totalProductPrice,
      totalDeliveryFee,
      usePoint,
      totalPrice,
    };

    orderApi(hostName).then((apiInstance) => {
      return apiInstance.postOrderProduct(orderData);
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
