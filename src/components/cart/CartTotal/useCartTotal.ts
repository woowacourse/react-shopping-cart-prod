import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { pointQuery } from '../../../recoil/selectors/point';
import useModal from '../../common/Modal/useModal';
import { FREE_SHIPPING_PRICE, SHIPPING_FEE } from '../../../constants/cart';
import { removeComma } from '../../../utils/removeComma';
import { isNumericString } from '../../../utils/isNumericString';
import type { ChangeEventHandler } from 'react';
import type { Product } from '../../../types/product';

const getIsFreeShipping = (totalPrice: number) =>
  totalPrice >= FREE_SHIPPING_PRICE;

const calcTotalOrderPrice = (
  totalProductPrice: Product['price'],
  usingPoint: number,
) => {
  if (totalProductPrice <= 0) return 0;

  return getIsFreeShipping(totalProductPrice)
    ? totalProductPrice - usingPoint
    : totalProductPrice + SHIPPING_FEE - usingPoint;
};

const useCartTotal = (totalProductPrice: Product['price']) => {
  const [usingPoint, setUsingPoint] = useState('');
  const usingPointRef = useRef('');
  const point = useRecoilValue(pointQuery);
  const { isModalOpen, closeModal } = useModal();
  const isPointMoreThanProductPrice = point > totalProductPrice;
  const maxPoint = isPointMoreThanProductPrice ? totalProductPrice : point;
  const totalOrderPrice = calcTotalOrderPrice(
    totalProductPrice,
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
    if (isPointMoreThanProductPrice && usingPoint !== '0') {
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
  } as const;
};

export default useCartTotal;
