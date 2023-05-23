import { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';

const ServerSelect = () => {
  const [selectedServer, setSelectedServer] = useState('바론');

  const changeServer: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedServer(e.target.value);
  };

  return (
    <Select value={selectedServer} onChange={changeServer}>
      <option value="바론">바론</option>
      <option value="블랙캣">블랙캣</option>
      <option value="케로">케로</option>
    </Select>
  );
};

const Select = styled.select`
  width: 102px;
  height: 42px;
  font-size: 16px;
  text-align: center;
`;

export default ServerSelect;
