import { useRecoilState, useSetRecoilState } from "recoil";
import { Select } from "./ServerSelectBox.style";
import { serverState } from "../../recoil/serverAtom";
import { ChangeEvent, useEffect } from "react";
import { fetchCartList } from "../../api/api";
import { cartState } from "../../recoil/cartAtoms";

function ServerSelectBox() {
  const [server, setServer] = useRecoilState(serverState);

  const onChangeServer = (e: ChangeEvent<HTMLSelectElement>) => {
    setServer(e.target.value);
  };

  const setCartList = useSetRecoilState(cartState);

  const loadCartList = async () => {
    const checkedCartItems = await fetchCartList(server);
    setCartList(checkedCartItems);
  };

  useEffect(() => {
    loadCartList();
  }, [server]);


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
