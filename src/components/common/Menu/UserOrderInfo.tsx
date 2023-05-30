import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { Link } from 'react-router-dom';

const EventInfo = () => {
  return (
    <EventInfoWrapper to="/order">
      <Text color="#ffffff" size="small">
        주문목록
      </Text>
    </EventInfoWrapper>
  );
};

export default EventInfo;

const EventInfoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 6px 0 6px;
`;
