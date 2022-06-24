import cn from "classnames";
import styles from "./Divider.module";

function Divider({ className, mini, light }) {
  return (
    <div
      className={cn(
        styles.divider,
        {
          [styles.mini]: mini,
          [styles.light]: light,
        },
        className
      )}
    />
  );
}

export default Divider;
