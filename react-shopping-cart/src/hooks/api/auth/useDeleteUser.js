import useFetch from '../../useFetch';

import { API_URL_PATH } from 'constants/api';

function useDeleteUser() {
  const { fetchData: deleteUser } = useFetch({ url: API_URL_PATH.CUSTOMERS, skip: true });

  return { deleteUser };
}

export default useDeleteUser;
