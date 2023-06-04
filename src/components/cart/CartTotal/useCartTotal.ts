import { useEffect, useRef, useState } from 'react';
import useModal from '../../common/Modal/useModal';
import { FREE_SHIPPING_PRICE, SHIPPING_FEE } from '../../../constants/cart';
import { removeComma } from '../../../utils/removeComma';
import { isNumericString } from '../../../utils/isNumericString';
import usePoint from '../../../hooks/usePoint';
import type { ChangeEventHandler } from 'react';
import type { Product } from '../../../types/product';

const getIsFreeShipping = (totalPrice: number) =>
  totalPrice >= FREE_SHIPPING_PRICE;

const calcTotalOrderPrice = (totalProductPrice: Product['price']) => {
  if (totalProductPrice <= 0) return 0;

  return getIsFreeShipping(totalProductPrice)
    ? totalProductPrice
    : totalProductPrice + SHIPPING_FEE;
};

const calcTotalPaymentPrice = (totalOrderPrice: number, usingPoint: number) => {
  if (totalOrderPrice <= 0) return 0;

  return totalOrderPrice - usingPoint;
};

const useCartTotal = (totalProductPrice: Product['price']) => {
  const [usingPoint, setUsingPoint] = useState('');
  const usingPointRef = useRef('');
  const { point } = usePoint();
  const { isModalOpen, closeModal } = useModal();
  const totalOrderPrice = calcTotalOrderPrice(totalProductPrice);
  const isPointMoreThanOrderPrice = point > totalOrderPrice;
  const maxPoint = isPointMoreThanOrderPrice ? totalOrderPrice : point;
  const totalPaymentPrice = calcTotalPaymentPrice(
    totalOrderPrice,
    Number(removeComma(usingPoint)),
  );

  const useAllPoint = () => {
    if (point <= 0) return;

    setUsingPoint(maxPoint.toLocaleString('ko-KR'));
  };

  const clearPoint = () => {
    setUsingPoint('0');
  };

  const updateUsingPoint: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const valueWithoutComma = removeComma(value);

    if (!isNumericString(valueWithoutComma)) return;

    setUsingPoint(Number(valueWithoutComma).toLocaleString('ko-KR'));
    usingPointRef.current = Number(valueWithoutComma).toLocaleString('ko-KR');

    const currentPoint = Number(removeComma(usingPointRef.current));

    if (currentPoint >= point || currentPoint >= totalProductPrice) {
      setUsingPoint(maxPoint.toLocaleString('ko-KR'));
    }
  };

  useEffect(() => {
    return () => {
      if (isModalOpen) {
        closeModal();
      }
    };
  }, []);

  useEffect(() => {
    if (isPointMoreThanOrderPrice && usingPoint !== '0') {
      setUsingPoint(maxPoint.toLocaleString('ko-KR'));
    }
  }, [totalProductPrice]);

  return {
    point,
    usingPoint,
    updateUsingPoint,
    clearPoint,
    useAllPoint,
    totalOrderPrice,
    totalPaymentPrice,
  } as const;
};

export default useCartTotal;
