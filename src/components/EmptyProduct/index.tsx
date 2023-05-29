import { useNavigate } from 'react-router-dom';

import Button from '@Components/Button';

import EmptyCartImage from '@Asset/emptyCart.png';

import * as S from './style';

function EmptyProduct({ text }: { text: string }) {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Image src={EmptyCartImage} />
      <S.GuideMessage>{text}</S.GuideMessage>
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

export default EmptyProduct;
