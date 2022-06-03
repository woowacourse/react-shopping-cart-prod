import React from "react";
import cn from "classnames";
import styles from "./input.module";

const Input = React.forwardRef(({ className, ...rest }, ref) => {
  return <input className={cn(styles.input, className)} {...rest} ref={ref} />;
});

Input.displayName = "Input";

export default Input;
