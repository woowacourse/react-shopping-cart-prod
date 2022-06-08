import useFetch from './useFetch';
import { useSelector } from 'react-redux';

import { API_URL_PATH } from 'constants/api';

function useDeleteUser(skip) {
  const { accessToken } = useSelector(state => state.auth);
  const headers = accessToken && { Authorization: `Bearer ${accessToken}` };

  const { fetchData: deleteUser } = useFetch({ url: API_URL_PATH.CUSTOMERS, headers, skip });

  return { deleteUser };
}

export default useDeleteUser;
