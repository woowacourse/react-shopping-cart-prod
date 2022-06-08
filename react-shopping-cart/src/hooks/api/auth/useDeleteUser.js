import useFetch from '../../useFetch';

import { API_URL_PATH } from 'constants/api';

function useDeleteUser(skip) {
  const { fetchData: deleteUser } = useFetch({ url: API_URL_PATH.CUSTOMERS, skip });

  return { deleteUser };
}

export default useDeleteUser;
