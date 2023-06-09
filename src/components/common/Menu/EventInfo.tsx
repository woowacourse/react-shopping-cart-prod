import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { Link } from 'react-router-dom';
import { URL } from '../../../abstract/constants';

const EventInfo = () => {
  return (
    <EventInfoWrapper to={URL.EVENT}>
      <Text color="#fff" size="small">
        이벤트
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
