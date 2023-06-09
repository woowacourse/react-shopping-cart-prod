import styled from 'styled-components';

import Message from '../components/Common/Message';
import ServerNameSelectBox from '../components/ServerName/ServerNameSelectBox';

const NotFoundPage = () => {
  return (
    <Main>
      <Message type='notFound' link />
      <SelectBoxWrapper>
        <ServerNameSelectBox />
      </SelectBoxWrapper>
    </Main>
  );
};

const Main = styled.main`
  position: relative;
  height: 100%;
`;

const SelectBoxWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default NotFoundPage;
