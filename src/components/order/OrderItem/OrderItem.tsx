import { RightChevronIcon } from '../../../assets/svg';
import { PATH } from '../../../constants/path';
import { ORDER_ITEM_DESCRIPTION_DATA } from '../../../constants/ui';
import { OrderData } from '../../../types/order';
import { dateFormatter, timeFormatter } from '../../../utils/formatter';
import * as S from './OrderItem.styles';

type OrderItemProps = OrderData;

const OrderItem = ({ ...information }: OrderItemProps) => {
  return (
    <S.OrderItemContainer>
      <S.OrderItemHeader>
        <S.OrderDate size="large">
          {dateFormatter(information.orderedAt)} ({timeFormatter(information.orderedAt)})
        </S.OrderDate>
        <S.OrderDetailLink to={`${PATH.ORDER}/${information.id}`}>
          주문내역 상세보기 <RightChevronIcon />
        </S.OrderDetailLink>
      </S.OrderItemHeader>
      <S.OrderItemContent>
        <S.OrderItemImage
          src={information.orderedItems[0].product.imageUrl}
          alt={information.orderedItems[0].product.name}
        />
        <S.OrderInformation>
          {ORDER_ITEM_DESCRIPTION_DATA.map((descriptionItem, index) => (
            <S.OrderInformationData key={index}>
              <S.OrderInformationDataLabel size="small" as="dt">
                {descriptionItem.LABEL}
              </S.OrderInformationDataLabel>
              <S.OrderInformationDataDescription>
                {descriptionItem.value(information)}
              </S.OrderInformationDataDescription>
            </S.OrderInformationData>
          ))}
        </S.OrderInformation>
      </S.OrderItemContent>
    </S.OrderItemContainer>
  );
};

export default OrderItem;
