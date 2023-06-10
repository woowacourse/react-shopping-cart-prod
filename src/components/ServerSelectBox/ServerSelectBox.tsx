import {useRecoilState, useRecoilValue} from "recoil";
import {Select} from "./ServerSelectBox.style";
import {serverState} from "../../app/recoil/serverAtom";
import {ChangeEvent, useEffect} from "react";
import {userState} from "../../app/recoil/user/userAtom.tsx";
import {userRepository} from "../../app/recoil/user/userRepository.tsx";
import {cartRepository} from "../../app/recoil/cart/cartRepository.ts";

function ServerSelectBox() {
  const {loadCartList} = useRecoilValue(cartRepository);
  const [server, setServer] = useRecoilState(serverState);
  const user = useRecoilValue(userState);

  const {logout} = useRecoilValue(userRepository);

  const onChangeServer = (e: ChangeEvent<HTMLSelectElement>) => {
    if (user) {
      if (confirm("로그아웃 하시겠습니까?")) {
        logout();
        setServer(e.target.value);
      }
    } else {
      setServer(e.target.value);
    }
  };

  useEffect(() => {
    loadCartList();
  }, [server, user]);

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
