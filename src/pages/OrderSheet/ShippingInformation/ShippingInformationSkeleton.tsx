import Checkbox from '@Components/Checkbox';

import * as S from './style';
import OrderDetailSheetLayout from '../OrderDetailSheetLayout';

function ShippingInformationSkeleton() {
  return (
    <S.Container>
      <OrderDetailSheetLayout title="배송정보" hasShownIcon={false}>
        <S.UserInfo>
          <S.UserName isLoading={true}>로딩중</S.UserName>
          <S.UserAddress isLoading={true}>로딩중</S.UserAddress>
          <S.UserContact isLoading={true}>로딩중</S.UserContact>
        </S.UserInfo>
        <S.MemoInput type="text" placeholder="배송 메모를 입력해주세요." />
        <S.CheckBoxLayout>
          <Checkbox size="small" />
          <S.CheckBoxText>다음에도 사용</S.CheckBoxText>
        </S.CheckBoxLayout>
      </OrderDetailSheetLayout>
    </S.Container>
  );
}

export default ShippingInformationSkeleton;
