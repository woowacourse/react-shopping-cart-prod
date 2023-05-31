import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './components/common/Header/Header';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<h1>서버 변경중..</h1>}>
        <Header />
        <Outlet />
      </Suspense>
    </div>
  );
}

export default App;
