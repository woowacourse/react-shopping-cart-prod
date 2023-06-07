import { styled } from 'styled-components';
import { SERVERS } from '../../constants';
import { ROUTER_PATH } from '../../router';
import { useRouter } from '../../hooks/Common/useRouter';
import { useRecoilState } from 'recoil';
import { serverOwnerState } from '../../recoil/atom';

export const ServerSelectBox = () => {
  const { goPage } = useRouter();
  const [serverOwner, setServerOwner] = useRecoilState(serverOwnerState);

  const handleServerSelected = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServerOwner(e.target.value);
    goPage(ROUTER_PATH.Main)();
  };

  return (
    <Wrapper value={serverOwner} onChange={handleServerSelected}>
      {Object.keys(SERVERS).map((server) => (
        <option key={crypto.randomUUID()}>{server}</option>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.select`
  width: 75px;
  height: 40px;

  font-size: 18px;
  font-weight: 600;
  padding: 0 5px;

  border-radius: 4px;
  background: var(--light-gray);
`;
