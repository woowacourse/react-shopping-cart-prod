import { PropsWithChildren } from 'react';
import styles from './index.module.scss';

interface ContentLayoutProps extends PropsWithChildren {
  title?: string;
}

function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <main className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </main>
  );
}

export default ContentLayout;
