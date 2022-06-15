import { useEffect } from 'react';
import { getItemList } from 'redux/action-creators/itemListThunk';
import { ItemListAction } from 'redux/actions/itemList';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useThunkFetch from 'hooks/useThunkFetch';
import { CartListAction } from 'redux/actions/cartList';
import { getCartList } from 'redux/action-creators/cartListThunk';
import ItemList from 'components/ItemList';
import Paginator from 'components/@common/Paginator';
import Loading from 'components/@common/Loading';
import RequestFail from 'components/@common/RequestFail';

const ItemListPage = () => {
  const { data: itemList, loading, error } = useAppSelector(state => state.itemListReducer);
  const dispatch = useAppDispatch<ItemListAction>();

  const { loading: cartListLoading } = useThunkFetch<CartListAction>(
    state => state.cartListReducer,
    getCartList
  );

  useEffect(() => {
    dispatch(getItemList());
  }, []);

  if (loading && cartListLoading) return <Loading />;
  if (error) return <RequestFail />;

  return (
    <>
      <ItemList fullItemList={itemList} />
      <Paginator maxIndex={itemList.length} />
    </>
  );
};

export default ItemListPage;
