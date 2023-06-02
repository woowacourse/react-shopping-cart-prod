import styles from './style.module.css';

interface AlertProps {
  text: string;
  handleAccept: () => void;
  handleCancel: () => void;
}

const Alert = ({ text, handleAccept, handleCancel }: AlertProps) => {
  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.AlertBox}>
        <div className={styles.textBox}>
          <p>{text}</p>
        </div>
        <div className={styles.ButtonBox}>
          <button className={styles.acceptButton} type="button" onClick={handleCancel}>
            취소
          </button>
          <button className={styles.cancelButton} type="button" onClick={handleAccept}>
            확인
          </button>
        </div>
      </div>
    </>
  );
};

export default Alert;
