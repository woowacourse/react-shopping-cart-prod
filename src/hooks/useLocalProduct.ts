import { useRecoilState, useRecoilValue } from "recoil";
import { localProductsState, serverOwnerState } from "../recoil/atom";
import { makeLocalProducts } from "../utils/domain";
import { useEffect } from "react";

export const useLocalProduct = () => {
  const [localProducts, setLocalProducts] = useRecoilState(localProductsState);
  const serverOwner = useRecoilValue(serverOwnerState);

  const setNewLocalProducts = async () => {
    const newProducts = await makeLocalProducts();
    setLocalProducts(newProducts);
  };

  useEffect(() => {
    setNewLocalProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverOwner]);

  return { localProducts, setLocalProducts };
};
