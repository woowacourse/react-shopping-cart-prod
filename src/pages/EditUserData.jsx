import { Outlet } from 'react-router-dom';

import Layout from 'components/Layout';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const EditUserData = () => (
  <Layout>
    <Styled.SignUpContainer>
      <CommonStyled.Container flexDirection="column" justifyContent="center">
        <Outlet />
      </CommonStyled.Container>
    </Styled.SignUpContainer>
  </Layout>
);

export default EditUserData;
