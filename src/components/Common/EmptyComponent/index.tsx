import { useNavigate } from 'react-router-dom';
import { ReactComponent as AlertBlank } from 'src/assets/baemin-alert-blank.svg';
import styles from './index.module.scss';

interface EmptyComponentProps {
  title: string;
}

function EmptyComponent({ title }: EmptyComponentProps) {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/');
  };

  return (
    <section className={styles['main-view-blank']}>
      <AlertBlank />
      <p>{title}</p>
      <button type="button" onClick={moveHome}>
        담으러 가기
      </button>
    </section>
  );
}

export default EmptyComponent;
