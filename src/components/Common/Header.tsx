import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import styled from 'styled-components';

import CartIcon from '../../assets/CartIcon';
import { totalCartProductSelect } from '../../recoil/cartProductData';
import { servers } from '../../constants/server';
import { hostNameAtom } from '../../recoil/hostData';
import { HostNameType } from '../../types/server';

const Header = () => {
  const totalCartProduct = useRecoilValue(totalCartProductSelect);
  const [hostName, setHostName] = useRecoilState(hostNameAtom);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHostName(e.target.value as HostNameType);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to='/'>
          <LogoContainer>
            <CartIcon width={51} height={44} color='white' />
            <Logo>SHOP</Logo>
          </LogoContainer>
        </Link>
        <ControlContainer>
          <SelectBox value={hostName} onChange={handleSelect}>
            {Object.keys(servers).map((server, index) => (
              <React.Fragment key={index}>
                <option>{server}</option>
              </React.Fragment>
            ))}
          </SelectBox>
          <Link to='/cart'>
            <MovePageBtn>
              장바구니
              <ProductCountAlert>{totalCartProduct}</ProductCountAlert>
            </MovePageBtn>
          </Link>
          <Link to='/order'>
            <MovePageBtn>주문 목록</MovePageBtn>
          </Link>
        </ControlContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const HeaderContent = styled.div`
  max-width: 1250px;
  height: 100%;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    margin-right: 18px;
    transform: scaleX(-1);
  }
`;

const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: 40px;
  font-weight: 900;
  letter-spacing: 0.1em;
  padding: 10px 0 0;

  @media (max-width: 420px) {
    display: none;
  }
`;

const ControlContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 40px;

  @media (max-width: 420px) {
    gap: 20px;
  }
`;

const SelectBox = styled.select`
  padding: 0 5px;

  @media (max-width: 420px) {
    height: 30px;
  }
`;

const MovePageBtn = styled.button`
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  font-weight: 500;

  @media (max-width: 420px) {
    margin-top: 4px;
    font-size: 13px;
  }
`;

const ProductCountAlert = styled.p`
  width: 26px;
  height: 26px;
  margin-left: 6px;
  text-align: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  line-height: 26px;
  font-size: 16px;

  @media (max-width: 420px) {
    width: 25px;
    height: 25px;

    font-size: 13px;
  }
`;

export default Header;
