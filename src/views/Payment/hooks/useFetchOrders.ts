import { ORDER_PATH } from '@constants/urlConstants';
import { useCredential } from '@recoil/server/credentialState';
import { useServerUrl } from '@recoil/server/serverUrlState';
import generateFetchOrders from '../remote/fetchOrders';

const useFetchOrders = () => {
  const { serverUrl } = useServerUrl();
  const { credential } = useCredential();

  return generateFetchOrders({ resource: `${serverUrl}/${ORDER_PATH}`, credential });
};

export default useFetchOrders;
