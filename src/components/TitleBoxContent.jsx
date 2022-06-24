import styles from "./TitleBoxContent.module";

function TitleBoxContent({ children }) {
  return <div className={styles.content}>{children}</div>;
}

export default TitleBoxContent;
