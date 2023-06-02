import { useNavigate } from 'react-router-dom';

import * as S from './Logo.style';

import { GiFullPizza } from 'react-icons/gi';

import { useRefreshCart } from '../../views/Cart/recoil/cartState';
import { useRefreshProduct } from '@views/Product/recoil/productListState';
import { styled } from 'styled-components';

function Logo() {
  const navigate = useNavigate();
  const refreshCart = useRefreshCart();
  const refreshProduct = useRefreshProduct();

  return (
    <S.LogoWrapper
      type="button"
      aria-label="SHOP 홈페이지로 가기"
      role="button"
      onClick={() => {
        refreshCart();
        refreshProduct();

        navigate('/');
      }}
    >
      <S.LogoContainer>
        <GiFullPizza size="40" />
      </S.LogoContainer>
      <LogoName>핏-짜나라 치즈공듀</LogoName>
    </S.LogoWrapper>
  );
}

export default Logo;

const LogoName = styled.p`
  font-size: 2.3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.lightColor};
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
