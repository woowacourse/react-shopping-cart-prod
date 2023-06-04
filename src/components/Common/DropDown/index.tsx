/* eslint-disable react/no-array-index-key */
import { useRef, useState } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import styles from './index.module.scss';

interface DropDownProps {
  options: string[];
  selectedListHandler: (currentTarget: HTMLLIElement) => void;
  currentOptionIndex: number;
}

function DropDown({ options, selectedListHandler, currentOptionIndex }: DropDownProps) {
  const [currentValue, setCurrentValue] = useState(options[currentOptionIndex]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => setShowOptions(prev => !prev);

  const close = () => setShowOptions(false);

  const handleOnChangeSelectValue: React.MouseEventHandler<HTMLLIElement> = event => {
    event.stopPropagation();
    const { innerText } = event.currentTarget;
    selectedListHandler(event.currentTarget);
    setCurrentValue(innerText);
    close();
  };

  useOnClickOutside<HTMLDivElement>(ref, close);

  return (
    <div role="button" tabIndex={0} className={styles['select-box']} onClick={toggle} ref={ref}>
      <label htmlFor="option" className={styles.label}>
        {currentValue}
      </label>
      <ul className={`${styles.selectOption} ${showOptions ? styles.show : styles.hide}`}>
        {showOptions &&
          options.map((data, idx) => (
            <li key={idx} className={styles.option} onClick={handleOnChangeSelectValue}>
              {data}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DropDown;
