import { useCredential } from '@recoil/server/credentialState';
import { useServerUrl } from '@recoil/server/serverUrlState';
import generateFetchCart from '../remote/generateFetchCart';
import { CART_PATH } from '@constants/urlConstants';

const useFetchCart = () => {
  const { serverUrl } = useServerUrl();
  const { credential } = useCredential();
  return generateFetchCart({ resource: `${serverUrl}/${CART_PATH}`, credential });
};

export default useFetchCart;
