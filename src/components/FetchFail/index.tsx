import { useContext } from 'react';
import { ErrorBoundaryContext } from 'src/context/ErrorBoundaryContext';
import styles from './index.module.scss';

function FetchFail() {
  const context = useContext(ErrorBoundaryContext);

  if (!context) return null;

  const { error } = context;

  return (
    <div className={styles['error-container']}>
      <h1 className={styles.message}>{error.message}</h1>
    </div>
  );
}

export default FetchFail;
