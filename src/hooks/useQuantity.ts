import { useRecoilState, useRecoilValue } from "recoil";
import { localProductsState, productsState } from "../recoil/atom";
import React, { useEffect, useState } from "react";
import { MAX_LENGTH_QUANTITY, MAX_QUANTITY, MIN_QUANTITY } from "../constants";
import { changeQuantity, deleteCartItem } from "../api";
import { LocalProductType } from "../types/domain";
import { makeLocalProducts } from "../utils/domain";

export const useQuantity = (productId: number) => {
  const [localProducts, setLocalProducts] = useRecoilState(localProductsState);
  const [quantity, setQuantity] = useState<string | undefined>("0");

  const currentLocalProduct = localProducts.find(
    (product: LocalProductType) => product.id === productId
  );
  useEffect(() => {
    setQuantity(currentLocalProduct?.quantity.toString());
  }, [currentLocalProduct]);

  const [isError, setIsError] = useState<boolean>(false);

  const setNewQuantity = async (newQuantity: number) => {
    if (!currentLocalProduct) return;
    if (newQuantity > MAX_QUANTITY || newQuantity < MIN_QUANTITY) return;

    try {
      if (newQuantity === 0) {
        const response = await deleteCartItem(currentLocalProduct.cartItemId);
        if (!response.ok) {
          throw new Error(response.status.toString());
        }
      } else {
        const response = await changeQuantity(
          currentLocalProduct.cartItemId,
          Number(newQuantity)
        );
        if (!response.ok) {
          throw new Error(response.status.toString());
        }
      }
    } catch (error) {
      setIsError(true);
    }

    setQuantity(newQuantity.toString());
    const newProducts = await makeLocalProducts();
    console.log("!!", newProducts);
    setLocalProducts(newProducts);
  };

  const handleQuantityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LENGTH_QUANTITY) return;

    setQuantity(e.target.value);
  };

  const handleQuantityBlured = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value === "" ||
      e.target.value === "-0" ||
      Number(quantity) < MIN_QUANTITY
    ) {
      e.target.value = MIN_QUANTITY.toString();
    }
    setNewQuantity(Number(e.target.value));
  };

  return {
    isError,
    quantity,
    setNewQuantity,
    handleQuantityChanged,
    handleQuantityBlured,
  } as const;
};
