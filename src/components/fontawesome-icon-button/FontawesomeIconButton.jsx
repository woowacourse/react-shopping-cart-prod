import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./fontawesome-icon-button.module";

function FontawesomeIconButton({ onClick, className, icon }) {
  return (
    <button
      type="button"
      onClick={() => onClick && onClick()}
      className={cn(styles.iconButton, className)}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export default FontawesomeIconButton;
