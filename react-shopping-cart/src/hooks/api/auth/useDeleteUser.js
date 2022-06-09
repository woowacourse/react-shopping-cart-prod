import useAuthFetch from 'hooks/useAuthFetch';

import { API_URL_PATH } from 'constants/api';

function useDeleteUser() {
  const { fetchData: deleteUser } = useAuthFetch({
    url: API_URL_PATH.CUSTOMERS,
    method: 'delete',
    skip: true,
  });

  return { deleteUser };
}

export default useDeleteUser;
