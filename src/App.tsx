import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header/Header';

function App() {
  return (
    <div className="App">
      <Header>Twinkle Store</Header>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

const Layout = styled.main`
  padding: 140px 0 60px 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 1250px;
`;

export default App;
