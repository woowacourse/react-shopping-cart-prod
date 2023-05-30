import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';

import { originState } from '../../../store/origin';
import { ORIGIN } from '../../../utils/origin';
import styles from './style.module.css';

const OriginSelector = () => {
  const [origin, setOrigin] = useRecoilState(originState);
  console.log(origin);
  const onChangeOrigin = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrigin(ORIGIN[e.target.value]);
  };

  return (
    <select onChange={onChangeOrigin} className={styles.SelectBox}>
      <option value="두둠" selected={origin === ORIGIN['두둠']}>
        두둠
      </option>
      <option value="무민" selected={origin === ORIGIN['무민']}>
        무민
      </option>
      <option value="망고" selected={origin === ORIGIN['망고']}>
        망고
      </option>
    </select>
  );
};

export default OriginSelector;
