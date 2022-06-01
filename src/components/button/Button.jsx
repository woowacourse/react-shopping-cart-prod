import cn from "classnames";
import styles from "./button.module";

function Button({
  children,
  type = "button",
  onClick,
  variant,
  size,
  block,
  outline,
  className,
}) {
  const classNames = cn(
    styles.button,
    styles[variant],
    styles[size],
    { [styles.block]: block },
    { [styles.outline]: outline },
    className
  );
  return (
    <button className={classNames} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
