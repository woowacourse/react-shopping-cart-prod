import cn from "classnames";

import Divider from "./Divider";

import styles from "./PageTitle.module";

function PageTitle({ children, className }) {
  return (
    <div className={cn(styles.pageTitle, className)}>
      <div className={styles.title}>{children}</div>
      <Divider />
    </div>
  );
}

export default PageTitle;
