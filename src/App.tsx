import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallback={<div>App에서 something wrong</div>}>
        <Header />
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}

export default App;
