import styles from './index.module.scss';

interface MessageProps {
  title: string;
  assign?: string;
  cancel?: string;
}

interface ModalNotificationProps {
  message: MessageProps;
  assignCallback: () => void;
  cancelCallback: () => void;
}

function ModalNotification({ message, assignCallback, cancelCallback }: ModalNotificationProps) {
  return (
    <div className={styles['notification-container']}>
      <div className={styles['message-container']}>{message.title}</div>
      <div className={styles['button-container']}>
        <button className={styles.button} type="button" onClick={cancelCallback}>
          {message.cancel ?? '취소'}
        </button>
        <button className={styles.button} type="button" onClick={assignCallback}>
          {message.assign ?? '확인'}
        </button>
      </div>
    </div>
  );
}

export default ModalNotification;
