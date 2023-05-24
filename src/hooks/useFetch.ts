import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  productsState,
  localProductsState,
  serverOwnerState,
} from "../recoil/atom";
import { makeLocalProducts } from "../utils/domain";

export const useFetch = () => {
  const serverOwner = useRecoilValue(serverOwnerState);
  const products = useRecoilValue(productsState);
  const setLocalProducts = useSetRecoilState(localProductsState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProductsWithQuantity();
  }, []);

  const setProductsWithQuantity = async () => {
    try {
      await fetchNewProducts();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNewProducts = async () => {
    const newProducts = await makeLocalProducts(products, serverOwner);
    setLocalProducts(newProducts);
  };

  return { isLoading, fetchNewProducts };
};
