import styled from '@emotion/styled';
import UserCartInfo from './UserCartInfo';
import EventInfo from './EventInfo';
import { Text } from '../Text/Text';
import UserOrderInfo from './UserOrderInfo';

const Menu = () => {
  return (
    <MenuWrapper>
      <EventInfo />
      <Text color="#ffffff" size="small">
        |
      </Text>
      <UserCartInfo />
      <Text color="#ffffff" size="small">
        |
      </Text>
      <UserOrderInfo />
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
