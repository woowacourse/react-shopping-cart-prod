import cn from "classnames";
import styles from "./HighlightedText.module";

function HighlightedText({ children }) {
  return (
    <div className={cn(styles.highlighter)}>
      {children}
      <span />
    </div>
  );
}

export default HighlightedText;
