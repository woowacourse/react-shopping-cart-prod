import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { couponsSelector, selectedCouponsState } from '../atoms/coupons';
import { selectedCartItemIdsState } from '../atoms/cart';

const useAllCouponSelect = () => {
  const { allCoupons } = useRecoilValue(couponsSelector);
  const [selectedCoupons, setSelectedCoupons] =
    useRecoilState(selectedCouponsState);
  const selectedCartIds = useRecoilValue(selectedCartItemIdsState);

  useEffect(() => {
    if (selectedCartIds.size === 0) {
      setSelectedCoupons([]);
    }
  }, [selectedCartIds, setSelectedCoupons]);

  const onSelectedCouponsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'DEFAULT' || selectedCartIds.size === 0) {
      e.target.selectedIndex = 0;
      setSelectedCoupons([]);
      return;
    }
    const couponId = +e.target.value;
    setSelectedCoupons([couponId]);
  };

  return { allCoupons, selectedCoupons, onSelectedCouponsChange };
};

export default useAllCouponSelect;
