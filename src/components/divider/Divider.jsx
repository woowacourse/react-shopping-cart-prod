import cn from "classnames";
import styles from "./divider.module";

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
