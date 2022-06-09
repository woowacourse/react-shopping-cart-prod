import { Button, ToolTip } from 'components/@common';

import { ICON_CODE } from 'constants/';
import { getNumberFormatter } from 'lib/formatterUtils';

import * as S from './styles';

function VerticalContent({ id, imageUrl, name, price, cartId, onClickCartButton }) {
  const handleClickCartButton = () => {
    onClickCartButton({ id, imageUrl, name, price });
  };

  return (
    <S.Container direction="vertical">
      <S.ImageContainer fill="true">
        <S.Image src={imageUrl} alt="product thumbnail" />
      </S.ImageContainer>

      <S.Description>
        <S.ItemInfo>
          <S.Title>{name}</S.Title>
          <S.Price>{getNumberFormatter(price)}원</S.Price>
        </S.ItemInfo>

        <S.ButtonContainer>
          <ToolTip text="장바구니 담기" align="bottom">
            <Button
              className="cart"
              icon={ICON_CODE.CART}
              status={cartId ? 'info' : 'default'}
              onClick={handleClickCartButton}
            />
          </ToolTip>
        </S.ButtonContainer>
      </S.Description>
    </S.Container>
  );
}

export default VerticalContent;
