import type { CartItemType } from '../../types';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import CheckBox from '../common/CheckBox';
import QuantityInput from '../common/QuantityInput';
import Image from '../common/Image';

import useToast from '../../hooks/useToast';
import { cartState, serverNameState, tokenState } from '../../recoil/state';
import api from '../../api';
import { API_ERROR_MESSAGE, MAX_QUANTITY } from '../../constants';

interface Props extends CartItemType {
  checked: boolean;
  toggleChecked: () => void;
  deleteChecked: () => void;
}

export default function CartItem(props: Props) {
  const { id, product, quantity, checked, toggleChecked, deleteChecked } = props;

  const serverName = useRecoilValue(serverNameState);
  const token = useRecoilValue(tokenState);
  const setCart = useSetRecoilState(cartState);

  const { showToast } = useToast();

  const removeCartItem = async () => {
    if (token === null) return;

    try {
      await api.deleteCartItem(serverName, token, id);
      deleteChecked();
    } catch {
      showToast('error', API_ERROR_MESSAGE.deleteCartItem);
      return;
    }

    try {
      const cart = await api.getCart(serverName, token);
      setCart(cart);
    } catch {
      showToast('error', API_ERROR_MESSAGE.getCart);
    }
  };

  return (
    <Wrapper>
      <CheckBox checked={checked} onClickCheckbox={toggleChecked} />
      <ImageBox>
        <Image src={product.imageUrl} />
      </ImageBox>
      <ProductName>{product.name}</ProductName>
      <ControlBox>
        <RemoveButton onClick={removeCartItem}>
          <img src="/trashCan.svg" />
        </RemoveButton>
        <QuantityInput
          cartItemId={id}
          min={1}
          max={MAX_QUANTITY}
          style={{ width: '98px', height: '48px', fontSize: '24px' }}
        />
        <Price>{(product.price * quantity).toLocaleString()}원</Price>
      </ControlBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;

  width: 736px;
  height: 144px;

  @media (max-width: 736px) {
    width: 100%;
  }

  @media (max-width: 448px) {
    width: 100%;
    height: 112px;
  }
`;

const ImageBox = styled.div`
  width: 144px;
  height: 144px;

  @media (max-width: 448px) {
    width: 96px;
    height: 96px;
  }
`;

const ProductName = styled.p`
  width: 400px;

  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333333;

  @media (max-width: 448px) {
    width: 24%;
    font-size: 14px;
  }
`;

const ControlBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;

  width: 112px;
  height: 100%;
`;

const RemoveButton = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;

  transition: width 0.3s;

  &:hover {
    width: 40px;
  }
`;

const Price = styled.div`
  line-height: 24px;
  letter-spacing: 0.5px;
  font-size: 16px;
  color: #333333;
`;
