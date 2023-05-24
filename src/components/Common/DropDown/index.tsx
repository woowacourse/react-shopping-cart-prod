import { useState } from 'react';
import styles from './index.module.scss';

interface DropDownProps {
  options: string[];
  selectedListHandler: (currentTarget: HTMLLIElement) => void;
}

function DropDown({ options, selectedListHandler }: DropDownProps) {
  const [currentValue, setCurrentValue] = useState(options[0]);
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue: React.MouseEventHandler<HTMLLIElement> = event => {
    const { innerText } = event.currentTarget;
    selectedListHandler(event.currentTarget);
    setCurrentValue(innerText);
  };

  const optionLists = options.map(data => (
    <li className={styles.option} onClick={handleOnChangeSelectValue}>
      {data}
    </li>
  ));

  return (
    <div className={styles['select-box']} onClick={() => setShowOptions(prev => !prev)}>
      <label className={styles.label}>{currentValue}</label>
      <ul className={`${styles.selectOption} ${showOptions ? styles.show : styles.hide}`}>{optionLists}</ul>
    </div>
  );
}

export default DropDown;
