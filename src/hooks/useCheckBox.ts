import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedProductsState } from "../recoil/atom";
import { localProductsSelector } from "../recoil/selector";
import { LocalProductType } from "../types/domain";

export const useCheckBox = () => {
  const cartProducts = useRecoilValue<LocalProductType[]>(
    localProductsSelector
  );
  const setSelectedProducts = useSetRecoilState(selectedProductsState);
  const [checkedArray, setCheckedArray] = useState(
    [...Array(cartProducts.length)].map(() => true)
  );

  useEffect(() => {
    setSelectedProducts(
      cartProducts.filter(
        (cartProduct, index) => checkedArray[index] && cartProduct
      )
    );
  }, [cartProducts, checkedArray, setSelectedProducts]);

  const getAllChecked = () => {
    return checkedArray.every((checked) => checked);
  };

  const handleCheckBox = (changedIndex: number) => () => {
    setCheckedArray((prev) =>
      prev.map((checked, index) =>
        changedIndex === index ? !checked : checked
      )
    );
  };

  const handleAllCheckBox = () => {
    setCheckedArray((prev) => prev.map(() => !getAllChecked()));
  };

  const removeCheckedArray = () => {
    setCheckedArray((prev) => prev.filter((checked) => !checked));
  };

  const removeTargetIndex = (targetIndex: number) => {
    setCheckedArray((prev) => prev.filter((_, index) => index !== targetIndex));
  };

  const allChecked = getAllChecked();

  return {
    checkedArray,
    allChecked,
    removeCheckedArray,
    removeTargetIndex,
    handleCheckBox,
    handleAllCheckBox,
  };
};
