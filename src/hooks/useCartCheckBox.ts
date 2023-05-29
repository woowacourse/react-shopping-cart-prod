import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkedCartProductIdsState } from 'state/checkedCartProductIds';
import { cartProductIdStoreState } from 'state/cartProductIdStore';
import { cartProductsState } from 'state/cartProducts';
import type { Product } from 'types/product';

const useCartCheckBox = () => {
  const cartProducts = useRecoilValue(cartProductsState);
  const cartProductIdStore = useRecoilValue(cartProductIdStoreState);
  const [checkedCartProductIds, setCheckedCartProductIds] = useRecoilState(checkedCartProductIdsState);

  useEffect(() => {
    const updatedCartProductIds = [...cartProducts.keys()];
    const updatedCheckedProducts = updatedCartProductIds.filter((cartProductId) =>
      checkedCartProductIds.has(cartProductId)
    );

    setCheckedCartProductIds(new Set(updatedCheckedProducts));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts]);

  const isAllChecked = cartProducts.size === checkedCartProductIds.size;
  const isChecked = (id: Product['id']) => checkedCartProductIds.has(cartProductIdStore[id]);

  const check = (id: Product['id']) => {
    setCheckedCartProductIds((prev) => new Set(prev.add(cartProductIdStore[id])));
  };

  const unCheck = (id: Product['id']) => {
    setCheckedCartProductIds((prev) => {
      prev.delete(cartProductIdStore[id]);

      return new Set(prev);
    });
  };

  const toggleCheck = (id: Product['id']) => {
    if (isChecked(id)) unCheck(id);
    else check(id);
  };

  const checkAllBox = () => {
    const allChecked = [...cartProducts.keys()];

    setCheckedCartProductIds(new Set(allChecked));
  };

  const unCheckAllBox = () => {
    setCheckedCartProductIds(new Set([]));
  };

  const toggleCheckAllBox = () => {
    if (isAllChecked) unCheckAllBox();
    else checkAllBox();
  };

  return { checkedCartProductIds, isAllChecked, isChecked, toggleCheck, toggleCheckAllBox };
};

export default useCartCheckBox;
