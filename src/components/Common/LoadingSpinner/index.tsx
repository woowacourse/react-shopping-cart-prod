import styles from './index.module.scss';

function LoadingSpinner() {
  return (
    <div className={styles.loading_spinner_box}>
      <div className={styles.loading_spinner} />
    </div>
  );
}

export default LoadingSpinner;
