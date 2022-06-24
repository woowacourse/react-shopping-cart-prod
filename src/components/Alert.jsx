import cn from "classnames";
import styles from "./Alert.module";

function Alert({ variant = "danger", children, className }) {
  return (
    <div className={cn(styles.alert, styles[variant], className)}>
      {children}
    </div>
  );
}

export default Alert;
