import { useParams } from 'react-router-dom';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from 'redux/actions/snackBar';
import useUpdateCartItem from 'hooks/useUpdateCartItem';
import { useFetch } from 'hooks/useFetch';
import useThunkFetch from 'hooks/useThunkFetch';
import { BASE_URL } from 'apis';
import type { Item } from 'types/domain';
import { MESSAGE } from 'constant/message';

export const useItemDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = Number(params.id);
  const { data: item, loading, error } = useFetch<Item>(`${BASE_URL}/products/${id}`);
  const { data: cartList } = useThunkFetch<CartListAction>(
    state => state.cartListReducer,
    getCartList
  );
  const { increaseQuantity } = useUpdateCartItem(cartList);

  const onClick = () => {
    increaseQuantity(id);
    dispatch(updateSnackBar(`${item.name} ${MESSAGE.ADD_CART}`));
  };

  return { loading, error, item, onClick };
};
