import Header from './components/Common/Header';

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
