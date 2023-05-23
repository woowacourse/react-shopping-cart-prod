import { useSetRecoilState } from "recoil";
import { Select } from "./ServerSelectBox.style";
import { serverState } from "../../recoil/serverAtom";
import { ChangeEvent } from "react";

function ServerSelectBox() {
  const setServer = useSetRecoilState(serverState);

  const onChangeServer = (e: ChangeEvent<HTMLSelectElement>) => {
    setServer(e.target.value);
  };

  return (
    <Select onChange={onChangeServer}>
      <option>테스트</option>
      <option>디노</option>
      <option>레오</option>
      <option>비버</option>
    </Select>
  );
}

export default ServerSelectBox;
