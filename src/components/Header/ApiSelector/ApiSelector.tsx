import { ChangeEvent } from 'react';
import * as styled from './ApiSelector.styled';

import { useBaseApiUrlState } from '@recoils/baseApiUrlAtoms';

const apiOptions = [
  { value: 'MSW', label: 'MSW' },
  { value: '이리내', label: '이리내' },
  { value: '채채', label: '채채' },
];

export const ApiSelector = () => {
  const [apiBaseUrlKey, setApiBaseUrlKey] = useBaseApiUrlState();

  const onChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setApiBaseUrlKey(value);
  };

  return (
    <styled.Selector onChange={onChange} value={apiBaseUrlKey}>
      <option value="MSW">MSW</option>
      <option value="이리내">이리내</option>
      <option value="채채">채채</option>
    </styled.Selector>
  );
};
