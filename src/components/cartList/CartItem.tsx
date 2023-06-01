import { CartItemType, CartType } from '../../types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as S from './styles/CartItem.styles';
import CheckBox from '../common/CheckBox';
import QuantityInput from '../common/QuantityInput';
import * as api from '../../api';
import { cartState } from '../../atom/cart';
import { API_ERROR_MESSAGE, MAX_QUANTITY } from '../../constants';
import useToast from '../hooks/useToast';
import { serverNameState } from '../../atom/serverName';
import { loginState } from '../../atom/login';

interface Props extends CartItemType {
  checked: boolean;
  toggleChecked: () => void;
  deleteChecked: () => void;
}

export default function CartItem(props: Props) {
  const { id, product, quantity, checked, toggleChecked, deleteChecked } = props;
  const setCart = useSetRecoilState(cartState);
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const { showToast } = useToast();

  const removeCartItem = async () => {
    try {
      await api.deleteCartItem(serverName, id, loginCredential);
      deleteChecked();
    } catch {
      showToast('error', API_ERROR_MESSAGE.deleteCartItem);
      return;
    }

    try {
      const cart = await api.getCart<CartType>(serverName, loginCredential);
      setCart(cart);
    } catch {
      showToast('error', API_ERROR_MESSAGE.getCart);
    }
  };

  const setAltSrc = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = './emptyProduct.svg';
  };

  return (
    <S.Wrapper>
      <CheckBox checked={checked} onClickCheckbox={toggleChecked} />
      <S.Image src={product.imageUrl} onError={setAltSrc} />
      <S.ProductName>{product.name}</S.ProductName>
      <S.ControlBox>
        <S.RemoveButton onClick={removeCartItem}>
          <img src="./trashCan.svg" />
        </S.RemoveButton>
        <QuantityInput cartItemId={id} min={1} max={MAX_QUANTITY} />
        <S.Price>{(product.price * quantity).toLocaleString()}원</S.Price>
      </S.ControlBox>
    </S.Wrapper>
  );
}
