import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import Checkbox from '@Components/Checkbox';

import serverState from '@Atoms/serverState';

import { SERVERS } from '@Constants/servers';

import * as S from './style';
import OrderDetailSheet from '../OrderDetailSheet';

function ShippingInformation() {
  const [isChecked, setIsChecked] = useState(false);

  const server = useRecoilValue(serverState);

  return (
    <S.Container>
      <OrderDetailSheet title="배송정보" hasShownIcon={false}>
        <S.UserInfo>
          <S.UserName>{SERVERS[server].serverName}</S.UserName>
          <S.UserAddress>{SERVERS[server].address}</S.UserAddress>
          <S.UserContact>{SERVERS[server].contact}</S.UserContact>
        </S.UserInfo>
        <S.MemoInput type="text" placeholder="배송 메모를 입력해주세요." />
        <S.CheckBoxLayout>
          <Checkbox size="small" isChecked={isChecked} updateSelectedState={() => setIsChecked(!isChecked)} />
          <S.CheckBoxText>다음에도 사용</S.CheckBoxText>
        </S.CheckBoxLayout>
      </OrderDetailSheet>
    </S.Container>
  );
}

export default ShippingInformation;
