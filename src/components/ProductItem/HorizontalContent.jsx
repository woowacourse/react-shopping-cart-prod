import { getNumberFormatter } from 'lib/formatterUtils';

import * as S from './styles';

function HorizontalContent({ imageUrl, name, price }) {
  return (
    <S.Container direction="horizontal">
      <S.ImageContainer>
        <S.Image src={imageUrl} alt={`${name} 상품 이미지`} />
      </S.ImageContainer>

      <S.ItemInfo direction="horizontal">
        <S.Title>{name}</S.Title>
        <S.Price>{getNumberFormatter(price)}원</S.Price>
      </S.ItemInfo>
    </S.Container>
  );
}

export default HorizontalContent;
