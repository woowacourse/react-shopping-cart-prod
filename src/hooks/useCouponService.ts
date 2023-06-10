import { useState } from 'react';
import { USERS_COUPON_PATH_NAME } from '../constant/server';
import { USER_AUTH_TOKEN } from '../constant/user';

const useRequestGetCoupon = (couponId: number) => {
  const [isLoading, setIsLoading] = useState(false);

  const requestGetCoupon = async () => {
    setIsLoading(true);
    const response = await fetch(USERS_COUPON_PATH_NAME, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ couponId: couponId }),
    });
    setIsLoading(false);

    if (response.status === 200) {
      return true;
    }

    return false;
  };

  return { requestGetCoupon, isLoading };
};

export default useRequestGetCoupon;
