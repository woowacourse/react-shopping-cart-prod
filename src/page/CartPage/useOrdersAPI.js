// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doDecideOrder } from 'reducers/cartReducer';
import { MESSAGE, ROUTES } from 'utils/constants';
import useSnackbar from '../../hooks/useSnackbar';

// DONE  6. POST 주문 추가하기
const useOrderAPI = () => {
  const navigate = useNavigate();
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();

  const orderCart = useCallback(
    async order => {
      try {
        const response = await apiClient.post('/orders', { productIds: order });
        dispatch(doDecideOrder({ orderList: response.data }));
        navigate(ROUTES.ORDER);
        renderSnackbar(MESSAGE.ORDER_PASS_SUCCESS, 'SUCCESS');
      } catch (error) {
        const customError = error.response.data;
        renderSnackbar(customError.message || error.message, 'FAILED');
        setError(customError || error);
      } finally {
        setIsOrderLoading(false);
      }
    },
    [dispatch, navigate, renderSnackbar],
  );

  return { orderCart, isOrderLoading, error };
};

export default useOrderAPI;
