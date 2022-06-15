import cn from "classnames";

import styles from "./CheckBox.module";

/* eslint-disable jsx-a11y/label-has-associated-control */
function CheckBox({ id, onChange, checked, className }) {
  return (
    <div className={cn(styles.checkbox, className)}>
      <input type="checkbox" id={id} onChange={onChange} checked={checked} />
      <label htmlFor={id} />
    </div>
  );
}

export default CheckBox;
