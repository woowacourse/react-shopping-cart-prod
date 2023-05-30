import { useCredential } from '@recoil/server/credentialState';
import { useServerUrl } from '@recoil/server/serverUrlState';
import fetchCoupons from '../components/utils/fetchCoupons';
import { COUPON_PATH } from '@constants/urlConstants';

const useFetchCoupons = () => {
  const { serverUrl } = useServerUrl();
  const { credential } = useCredential();

  return () => fetchCoupons({ resource: `${serverUrl}/${COUPON_PATH}`, credential });
};

export default useFetchCoupons;
