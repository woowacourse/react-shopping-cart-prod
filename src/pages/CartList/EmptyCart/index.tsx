import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Button from '@Components/Button';

import cartItemsAmountState from '@Selector/cartItemsAmountState';

import EmptyCartImage from '@Asset/emptyCart.png';

import * as S from './style';

function EmptyCart() {
  const navigate = useNavigate();

  const cartAmount = useRecoilValue(cartItemsAmountState);

  if (cartAmount !== '0') return <></>;

  return (
    <S.Container>
      <S.Image src={EmptyCartImage} />
      <S.GuideMessage>장바구니에 담긴 상품이 없습니다.</S.GuideMessage>
      <Button
        text="홈으로 가기"
        onClick={() => {
          navigate('/');
        }}
        backgroundColor="#06C09E"
        width="240px"
      />
    </S.Container>
  );
}

export default EmptyCart;
