import styles from './index.module.scss';

type SpinnerSize = 'small' | 'medium' | 'large';
interface LoadingSpinnerProps {
  size: SpinnerSize;
}

function LoadingSpinner({ size = 'small' }: LoadingSpinnerProps) {
  return (
    <div className={styles.loading_spinner_box}>
      <div className={`${styles.loading_spinner} ${styles[size]}`} />
    </div>
  );
}

export default LoadingSpinner;
