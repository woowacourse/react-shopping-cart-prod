import Header from 'components/@common/Header';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { Outlet } from 'react-router-dom';

const Root = () => {
  const { renderToast } = useToast();

  return (
    <>
      <Header />
      <Outlet />
      {renderToast}
    </>
  );
};

export default Root;
