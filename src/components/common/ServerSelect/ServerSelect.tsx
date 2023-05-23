import { ChangeEventHandler } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { serverOriginState } from '../../../recoil/atoms';

const ServerSelect = () => {
  const [serverOrigin, setServerOrigin] = useRecoilState(serverOriginState);

  const changeServer: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setServerOrigin(e.target.value);
  };

  return (
    <Select value={serverOrigin} onChange={changeServer}>
      <option value="">바론</option>
      <option value="http://ec2-13-209-97-56.ap-northeast-2.compute.amazonaws.com:8080">
        블랙캣
      </option>
      <option value="localhost:9000">케로</option>
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
