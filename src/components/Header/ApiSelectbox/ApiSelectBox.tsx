import { ChangeEvent } from 'react';
import * as styled from './ApiSelectBox.styled';

import { useBaseApiUrlState } from '@recoils/baseApiUrlAtoms';

const apiOptions = [
  { value: 'MSW', label: 'MSW' },
  { value: '이리내', label: '이리내' },
  { value: '채채', label: '채채' },
];

export const ApiSelectBox = () => {
  const [apiBaseUrlKey, setApiBaseUrlKey] = useBaseApiUrlState();

  const onChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setApiBaseUrlKey(value);
  };

  return (
    <styled.SelectBox onChange={onChange} value={apiBaseUrlKey}>
      {apiOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </styled.SelectBox>
  );
};
