import cn from "classnames";
import CheckBox from "../default/CheckBox";
import styles from "./LabeledCheckbox.module";

/* eslint-disable jsx-a11y/label-has-associated-control */
function LabeledCheckbox({ id, label, onChange, checked }) {
  return (
    <div className={cn(styles.checkboxContainer)}>
      <CheckBox id={id} onChange={onChange} checked={checked} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

LabeledCheckbox.defaultProps = {
  onChange: () => undefined,
};

export default LabeledCheckbox;
