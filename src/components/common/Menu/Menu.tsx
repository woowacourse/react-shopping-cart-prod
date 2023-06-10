import styled from '@emotion/styled';
import UserCartInfo from './UserCartInfo';
import MenuInfo from './MenuInfo';
import { URL } from '../../../abstract/constants';

const Menu = () => {
  return (
    <MenuWrapper>
      <MenuInfo url={URL.EVENT} title={'이벤트'} />
      <Separator />
      <UserCartInfo />
      <Separator />
      <MenuInfo url={URL.ORDER} title={'주문 목록'} />
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Separator = styled.div`
  color: #fff;
  padding: 0 5px;

  &::before {
    content: '|';
  }
`;
