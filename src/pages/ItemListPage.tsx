import { useEffect } from 'react';
import { getItemList } from 'redux/action-creators/itemListThunk';
import { ItemListAction } from 'redux/actions/itemList';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getCartList } from 'redux/action-creators/cartListThunk';
import ItemList from 'components/ItemList';
import Paginator from 'components/@common/Paginator';
import Loading from 'components/@common/Loading';
import RequestFail from 'components/@common/RequestFail';
import { getLocalStorageToken } from 'utils/localStorage';

const ItemListPage = () => {
  const dispatch = useAppDispatch<ItemListAction>();
  const { data: itemList, loading, error } = useAppSelector(state => state.itemListReducer);

  useEffect(() => {
    dispatch(getItemList());
    if (getLocalStorageToken()) {
      dispatch(getCartList());
    }
  }, []);

  if (loading) return <Loading />;
  if (error) return <RequestFail />;

  return (
    <>
      <ItemList fullItemList={itemList} />
      <Paginator maxIndex={itemList.length} />
    </>
  );
};

export default ItemListPage;
