import styles from "./PageLoader.module";

function PageErrorResult({ errorMessage }) {
  return <div className={styles.guideMessage}>😥 ERROR :: {errorMessage}</div>;
}

export default PageErrorResult;
