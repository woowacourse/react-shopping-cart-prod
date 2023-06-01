import { ReactNode, useState } from 'react';

import * as S from './style';

type OrderDetailSheetLayoutProps = {
  title: string;
  children: ReactNode;
  hasShownIcon?: boolean;
};

function OrderDetailSheetLayout({ title, children, hasShownIcon = true }: OrderDetailSheetLayoutProps) {
  const [isOpenCartItems, setIsOpenCartItems] = useState(!hasShownIcon);
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

export default OrderDetailSheetLayout;
