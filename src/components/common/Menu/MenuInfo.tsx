import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { Link } from 'react-router-dom';
import { URL } from '../../../abstract/constants';

const MenuInfo = ({ url, title }: { url: string; title: string }) => {
  return (
    <EventInfoWrapper to={url}>
      <Text color="#fff" size="small">
        {title}
      </Text>
    </EventInfoWrapper>
  );
};

export default MenuInfo;

const EventInfoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 0 6px;
`;
