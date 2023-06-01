import { useRecoilState, useRecoilValue } from "recoil";
import { Select } from "./ServerSelectBox.style";
import { serverState } from "../../recoil/serverAtom";
import { ChangeEvent, useEffect } from "react";
import { cartRepository } from "../../recoil/cartAtoms";

function ServerSelectBox() {
  const { loadCartList } = useRecoilValue(cartRepository);
  const [server, setServer] = useRecoilState(serverState);

  const onChangeServer = (e: ChangeEvent<HTMLSelectElement>) => {
    setServer(e.target.value);
  };

  useEffect(() => {
    loadCartList();
  }, [server]);

  return (
    <Select value={server} onChange={onChangeServer}>
      <option>테스트</option>
      <option>디노</option>
      <option>레오</option>
      <option>비버</option>
    </Select>
  );
}

export default ServerSelectBox;
