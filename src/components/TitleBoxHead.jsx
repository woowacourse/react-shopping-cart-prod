import styles from "./TitleBoxHead.module";

function TitleBoxHead({ children }) {
  return <div className={styles.head}>{children}</div>;
}

export default TitleBoxHead;
