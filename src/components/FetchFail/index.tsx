import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundaryContext } from 'src/context/ErrorBoundaryContext';
import useError from 'src/hooks/useError';
import styles from './index.module.scss';

function FetchFail() {
  const navigation = useNavigate();
  const context = useContext(ErrorBoundaryContext);
  const { resetBoundary } = useError();

  if (!context) return null;

  const moveHome = () => {
    navigation('/');
    resetBoundary();
  };

  const { error } = context;

  return (
    <div className={styles['error-container']}>
      <h1 className={styles.message}>{error.message}</h1>
      <div>
        <button type="button" onClick={resetBoundary}>
          다시 시도하기
        </button>
        <button type="button" onClick={moveHome}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default FetchFail;
