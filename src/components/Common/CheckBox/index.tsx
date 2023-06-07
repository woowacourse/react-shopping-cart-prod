import styles from './index.module.scss';

type CheckBoxSize = 'medium' | 'large';

interface CheckBoxProps {
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  size?: CheckBoxSize;
}

function CheckBox({ changeHandler, checked, size = 'medium' }: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      className={`${styles['check-box']} ${styles[size]}`}
      onChange={changeHandler}
      checked={checked}
    />
  );
}

export default CheckBox;
