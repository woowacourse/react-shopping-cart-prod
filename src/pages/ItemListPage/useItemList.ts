import { useEffect } from 'react';
import { getItemList } from 'redux/action-creators/itemListThunk';
import { ItemListAction } from 'redux/actions/itemList';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { getLocalStorageToken } from 'utils/localStorage';

export const useItemList = () => {
  const dispatch = useAppDispatch<ItemListAction>();
  const { data: itemList, loading, error } = useAppSelector(state => state.itemListReducer);

  useEffect(() => {
    dispatch(getItemList());
    if (getLocalStorageToken()) {
      dispatch(getCartList());
    }
  }, []);

  return { loading, error, itemList };
};
