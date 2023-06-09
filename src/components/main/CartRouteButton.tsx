import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { cartBadgeSelector } from '../../store/CartSelector';
import { BiCart } from 'react-icons/bi';

interface Props {
  onClick: () => void;
}

const CartRouteButton = ({ onClick }: Props) => {
  const selectedProductsCount = useRecoilValue(cartBadgeSelector);

  return (
    <S.Wrapper onClick={onClick}>
      <S.Button>
        <BiCart size={44} />
        <S.Label>장바구니</S.Label>
      </S.Button>
      <S.Badge id="cart-badge">{selectedProductsCount}</S.Badge>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    position: relative;
    align-items: center;
    margin-left: auto;
    height: fit-content;
  `,

  Button: styled.button`
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-right: 8px;
    background: none;
    color: var(--text-color);
  `,

  Badge: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 22px;
    height: 22px;
    background: #ff595e;
    border-radius: 50%;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  `,

  Label: styled.label`
    position: absolute;
    top: 10px;
    height: 12px;
    font-size: 12px;
    font-weight: 400;
  `,
};

export default CartRouteButton;
