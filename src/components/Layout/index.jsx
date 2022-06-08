import { useSelector } from 'react-redux';
import Spinner from 'components/Spinner';
import Header from './Header';
import Footer from './Footer';

import * as Styled from './styles';

const Layout = ({ children }) => {
  const { isPending } = useSelector((state) => state.spinner);

  return (
    <Styled.Container>
      <Header />
      {isPending && <Spinner />}
      <main>{children}</main>
      <Footer />
    </Styled.Container>
  );
};

export default Layout;
