import cn from "classnames";
import CaretUp from "@assets/images/caret-up.svg";
import CaretDown from "@assets/images/caret-down.svg";
import styles from "./number-input.module";

function NumberInput({
  value,
  onChange,
  step = 1,
  positive = true,
  maxLength = 3,
  className,
}) {
  const handleChange = (e) => {
    const { target } = e;
    const { selectionStart } = target;
    let cursor = Math.max(0, selectionStart);
    const newValue = target.value.replace(/[^0-9]/g, "");
    if (newValue.length < target.value.length) {
      cursor = Math.max(0, selectionStart - 1);
    }

    queueMicrotask(() => {
      target.setSelectionRange(cursor, cursor);
    });

    onChange(newValue);
  };

  const handleIncrease = () => {
    onChange(value + step);
  };

  const handleDecrease = () => {
    const newValue = positive
      ? Math.max(0, Number(value) - step)
      : Number(value) - step;
    onChange(newValue);
  };

  return (
    <div className={cn(styles.numberInput, className)}>
      <input
        type="text"
        onChange={handleChange}
        value={value}
        maxLength={maxLength}
      />
      <div className={styles.steps}>
        <button type="button" onClick={handleIncrease} className={styles.up}>
          <CaretUp />
        </button>
        <div className={styles.divider} />
        <button type="button" onClick={handleDecrease} className={styles.down}>
          <CaretDown />
        </button>
      </div>
    </div>
  );
}

export default NumberInput;
