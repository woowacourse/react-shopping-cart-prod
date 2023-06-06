import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CartIcon from '../../assets/CartIcon';
import { useRecoilState, useRecoilValue } from 'recoil';
import { totalCartProductSelect } from '../../recoil/cartProductData';
import { hostNameAtom } from '../../recoil/hostData';
import { servers } from '../../constants/server';
import { SM, XL, XS } from '../../constants/screenSizes';
import type { HostNameType } from '../../types/server';

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
              <option key={`server-${index}`}>{server}</option>
            ))}
          </SelectBox>
          <Link to='/cart'>
            <MoveCartPageBtn>
              <DesktopLabel>장바구니</DesktopLabel>
              <MobileLabel>🛒</MobileLabel>
              <ProductCountAlert>{totalCartProduct}</ProductCountAlert>
            </MoveCartPageBtn>
          </Link>
          <Link to='/orders'>
            <MoveOrderListPageBtn>
              <DesktopLabel>주문목록</DesktopLabel>
              <MobileLabel>📝</MobileLabel>
            </MoveOrderListPageBtn>
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
  max-width: ${XL};
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

  @media (max-width: ${XS}) {
    display: none;
  }
`;

const ControlContainer = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: ${SM}) {
    gap: 15px;
  }
`;

const SelectBox = styled.select`
  padding: 0 5px;
`;

const MoveCartPageBtn = styled.button`
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  font-weight: 500;
`;

const MoveOrderListPageBtn = styled.button`
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  font-weight: 500;
`;

const DesktopLabel = styled.span`
  display: inline;

  @media (max-width: ${SM}) {
    display: none;
  }
`;

const MobileLabel = styled.span`
  display: none;

  @media (max-width: ${SM}) {
    display: inline;
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
`;

export default Header;
