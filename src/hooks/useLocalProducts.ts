import { useRecoilState, useSetRecoilState } from "recoil";
import { localProductsState, loginState } from "../recoil/atom";
import { makeLocalProducts, makeProducts } from "../utils/domain";

export const useLocalProducts = () => {
  const [isLogined, setIsLogined] = useRecoilState(loginState);
  const setLocalProducts = useSetRecoilState(localProductsState);

  const updateLocalProducts = async () => {
    const newProducts = isLogined
      ? await makeLocalProducts()
      : await makeProducts();
    setLocalProducts(newProducts);
  };

  return { updateLocalProducts };
};
