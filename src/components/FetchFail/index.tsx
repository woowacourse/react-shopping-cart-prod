import { useContext } from 'react';
import { ErrorBoundaryContext } from 'src/context/ErrorBoundaryContext';
import useError from 'src/hooks/useError';
import styles from './index.module.scss';

function FetchFail() {
  const context = useContext(ErrorBoundaryContext);
  const { resetBoundary } = useError();

  if (!context) return null;

  const { error } = context;

  return (
    <div className={styles['error-container']}>
      <h1 className={styles.message}>{error.message}</h1>
      <button type="button" onClick={resetBoundary}>
        다시 시도하기
      </button>
    </div>
  );
}

export default FetchFail;
