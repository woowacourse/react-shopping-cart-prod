import FlexBox from '../FlexBox/FlexBox.component';
import styled from 'styled-components';

const PageContainer = styled(FlexBox).attrs(props => ({
  justifyContent: 'center',
  direction: props.direction,
  alignItems: props.alignItems,
}))`
  margin: 60px 0;
  padding: 0 120px;
  width: 100%;
`;

export default PageContainer;
