import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './components/Header';
import ErrorDisplay from './components/ErrorDisplay';

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorDisplay}>
        <Header />
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}

export default App;
