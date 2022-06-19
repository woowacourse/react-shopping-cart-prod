import ItemList from 'components/ItemList';
import Paginator from 'components/@common/Paginator';
import Loading from 'components/@common/Loading';
import RequestFail from 'components/@common/RequestFail';
import { useItemList } from './useItemList';

const ItemListPage = () => {
  const { loading, error, itemList } = useItemList();

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
