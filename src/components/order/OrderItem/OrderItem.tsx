import { RightChevronIcon } from '../../../assets/svg';
import { PATH } from '../../../constants/path';
import { ORDER_ITEM_DESCRIPTION_DATA } from '../../../constants/ui';
import type { OrderData } from '../../../types/order';
import { dateFormatter, timeFormatter } from '../../../utils/formatter';
import { Text } from '../../common/Text/Text.styles';
import * as S from './OrderItem.styles';

type OrderItemProps = OrderData;

const OrderItem = ({ ...information }: OrderItemProps) => {
  const firstOrderItem = information.orderedItems[0];

  return (
    <S.ItemContainer>
      <S.ItemHeader>
        <Text className="medium" size="large">
          {dateFormatter(information.orderedAt)} ({timeFormatter(information.orderedAt)})
        </Text>
        <S.HeaderLink to={`${PATH.ORDER}/${information.id}`}>
          주문내역 상세보기 <RightChevronIcon />
        </S.HeaderLink>
      </S.ItemHeader>
      <S.ItemContent>
        <S.ItemImage src={firstOrderItem.imageUrl} alt={firstOrderItem.name} />
        <S.ItemInformation>
          {ORDER_ITEM_DESCRIPTION_DATA.map((descriptionItem, index) => (
            <S.InformationData key={index}>
              <S.DataLabel size="small">{descriptionItem.LABEL}</S.DataLabel>
              <S.DataDescription>{descriptionItem.VALUE(information)}</S.DataDescription>
            </S.InformationData>
          ))}
        </S.ItemInformation>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export default OrderItem;
