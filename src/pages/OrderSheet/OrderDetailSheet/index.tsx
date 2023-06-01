import { ReactNode, useState } from 'react';

import * as S from './style';

type OrderDetailSheetProps = {
  title: string;
  children: ReactNode;
  hasShownIcon?: boolean;
};

function OrderDetailSheet({ title, children, hasShownIcon = true }: OrderDetailSheetProps) {
  const [isOpenCartItems, setIsOpenCartItems] = useState(true);
  const shownIcon = isOpenCartItems ? '▲' : '▼';

  return (
    <>
      <S.OrderSheetHeader>
        <S.OrderSheetAmount>{title}</S.OrderSheetAmount>
        {hasShownIcon && (
          <S.OrderSheetShownIcon onClick={() => setIsOpenCartItems((prev) => !prev)}>{shownIcon}</S.OrderSheetShownIcon>
        )}
      </S.OrderSheetHeader>
      {isOpenCartItems && children}
    </>
  );
}

export default OrderDetailSheet;
