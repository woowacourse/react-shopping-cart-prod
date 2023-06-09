import { CartItemType } from '../../types';
import { useRecoilValue } from 'recoil';
import * as S from './styles/CartItem.styles';
import CheckBox from '../common/CheckBox';
import QuantityInput from '../common/QuantityInput';
import { PRODUCT_MAX_QUANTITY } from '../../constants';
import { serverNameState } from '../../atom/serverName';
import { loginState } from '../../atom/login';
import { useGetCartList } from '../hooks/useGetCartList';
import { useDeleteCartItem } from '../hooks/useDeleteCartItem';
import Image from '../common/Image';

interface Props extends CartItemType {
  checked: boolean;
  toggleChecked: () => void;
  deleteChecked: () => void;
}

export default function CartItem(props: Props) {
  const { id, product, quantity, checked, toggleChecked, deleteChecked } = props;
  const { getCartsThroughApi } = useGetCartList();
  const { deleteCartItemThroughApi } = useDeleteCartItem();
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);

  const removeCartItem = async () => {
    await deleteCartItemThroughApi(serverName, loginCredential, id);

    getCartsThroughApi(serverName, loginCredential);
  };

  return (
    <S.Wrapper>
      <CheckBox checked={checked} onClickCheckbox={toggleChecked} />
      <S.ImageWrapper>
        <Image src={product.imageUrl} width="144px" height="144px" />
      </S.ImageWrapper>
      <S.ProductName>{product.name}</S.ProductName>
      <S.ControlBox>
        <S.RemoveButton onClick={removeCartItem}>
          <Image src="./trashCan.svg" />
        </S.RemoveButton>
        <QuantityInput cartItemId={id} min={1} max={PRODUCT_MAX_QUANTITY} />
        <S.Price>{(product.price * quantity).toLocaleString()}원</S.Price>
      </S.ControlBox>
    </S.Wrapper>
  );
}
