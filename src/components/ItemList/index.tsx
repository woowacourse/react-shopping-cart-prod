import { useParams } from 'react-router-dom';
import { Item } from 'types/domain';
import { Styled } from './styles';
import ItemContainer from 'components/ItemList/ItemContainer';

const contentsNumLimit = 12;

const ItemList = ({ fullItemList }: { fullItemList: Item[] }) => {
  const params = useParams();
  const id = Number(params.id);

  if (fullItemList.length === 0) return null;

  const itemList = fullItemList.slice((id - 1) * contentsNumLimit, id * contentsNumLimit);

  return (
    <Styled.ItemList>
      {itemList.map(item => (
        <ItemContainer key={item.id} item={item} />
      ))}
    </Styled.ItemList>
  );
};

export default ItemList;
