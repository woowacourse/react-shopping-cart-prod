import styled, { css } from 'styled-components';
import { ROUTE_PATH } from '../../constants';
import { useGoToAnotherPage } from '../../hooks/useGoToAnotherPage';
import Cart from '../Cart';
import CartIcon from '../icons/CartIcon';
import ServerSelector from '../ServerSelector';
import Button from './Button';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const goToPage = useGoToAnotherPage();

  return (
    <S.Header>
      <S.Wrapper>
        <Button css={buttonStyle} onClick={() => goToPage(ROUTE_PATH.MAIN_PAGE)}>
          <CartIcon aria-label='하얀색 카트 모양의 로고' />
          <span>{title}</span>
        </Button>
        <ServerSelector />
        <Cart />
      </S.Wrapper>
    </S.Header>
  );
};

const S = {
  Header: styled.header`
    width: 100%;
    height: 80px;
    margin-bottom: 62px;
    background: var(--text-color);
    line-height: 80px;
    `,

Wrapper: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 1270px;
    margin: 0 auto;
    padding: 0 20px;
  `,
};

const buttonStyle = css`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 0.2px;
  
  & svg {
      width: 44px;
      height: 36px;
      margin-right: 20px;
      fill: #fff;
    }

    @media (max-width: 768px) {
      font-size: 28px;

      & svg {
        width: 40px;
        margin-right: 16px;
      }
    }

    @media (max-width: 480px) {
      font-size: 24px;

      & svg {
        align-self: center;
        width: 34px;
        margin-right: 8px;
        padding: 2px;
      }
    }
`;

export default Header;
