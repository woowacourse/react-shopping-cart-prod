import Button from '../../common/Button/Button';
import { Text } from '../../common/Text/Text.styles';
import * as S from './CartItemDelete.styles';

interface CartItemDeleteProps {
  removeItem: (variables: void) => void;
  handleModalClose: () => void;
}

const CartItemDelete = ({ removeItem, handleModalClose }: CartItemDeleteProps) => {
  return (
    <S.ContentContainer>
      <Text css={S.messageStyle} id="modal-description">
        해당 상품을 삭제하시겠습니까?
      </Text>
      <S.ButtonContainer>
        <Button css={S.cancelButtonStyle} variant="textButton" onClick={handleModalClose}>
          취소
        </Button>
        <Button css={S.deleteButtonStyle} variant="textButton" onClick={() => removeItem()}>
          삭제
        </Button>
      </S.ButtonContainer>
    </S.ContentContainer>
  );
};

export default CartItemDelete;
