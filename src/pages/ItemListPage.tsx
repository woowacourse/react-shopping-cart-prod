import { useEffect } from 'react';
import { getItemList } from 'redux/action-creators/itemListThunk';
import { ItemListAction } from 'redux/actions/itemList';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import ItemList from 'components/ItemList';
import Paginator from 'components/common/Paginator';
import Loading from 'components/common/Loading';
import RequestFail from 'components/common/RequestFail';
import { useParams } from 'react-router-dom';

const ItemListPage = () => {
  const { data: itemList, loading, error } = useAppSelector(state => state.itemListReducer);
  const dispatch = useAppDispatch<ItemListAction>();

  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    dispatch(getItemList());
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
