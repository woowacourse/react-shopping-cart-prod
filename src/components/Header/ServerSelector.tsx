import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { serverNameState } from '../../recoil';
import { ServerName } from '../../types';

const ServerSelector = () => {
  const [serverName, setServerName] = useRecoilState(serverNameState);

  const handleSeverChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setServerName(value as ServerName);
  };

  return (
    <StyledSelect name="서버" aria-label="서버 선택" value={serverName} onChange={handleSeverChange}>
      <option value="준팍">준팍</option>
      <option value="도이">도이</option>
      <option value="우르">우르</option>
      <option value="MSW">MSW</option>
    </StyledSelect>
  );
};

const StyledSelect = styled.select`
  margin: 0 16px 0 auto;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export default ServerSelector;
