import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';

import { originState } from '../../store/origin';
import { ORIGIN } from '../../utils/origin';

const OriginSelector = () => {
  const [, setOrigin] = useRecoilState(originState);

  const onChangeOrigin = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrigin(ORIGIN[e.target.value]);
  };

  return (
    <select onChange={onChangeOrigin}>
      <option value="두둠">두둠</option>
      <option value="무민">무민</option>
      <option value="망고">망고</option>
    </select>
  );
};

export default OriginSelector;
