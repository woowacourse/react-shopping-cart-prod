import { ChangeEvent, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { serverSelectState } from "recoil/server";
import { styled } from "styled-components";
import { ServerId } from "recoil/server";
import { cartListState } from "recoil/cart";
import { getCartItems } from "api/cartItems";
import { CartProduct } from "types/domain";

const ServerSeclector = () => {
  const [serverState, setServerState] = useRecoilState(serverSelectState);
  const chagneServer = (e: ChangeEvent<HTMLInputElement>) => {
    setServerState(e.target.id as ServerId);
  };

  const setCartList = useSetRecoilState(cartListState);

  useEffect(() => {
    getCartItems(serverState).then((res) => {
      setCartList(
        res.map((item) => {
          const newItem: CartProduct = {
            ...item,
            isChecked: true,
          };

          return newItem;
        })
      );
    });
  }, [serverState]);

  const serverList: { [key in ServerId]: string } = {
    "power-server": "파워 서버",
    "ttaengchil-server": "땡칠 서버",
    "ori-server": "오리 서버",
  };

  return (
    <Wrapper>
      <InputBox>
        <Input
          type="radio"
          name="server"
          id={Object.keys(serverList)[0]}
          checked={serverState === Object.keys(serverList)[0]}
          onChange={chagneServer}
        />
        {Object.values(serverList)[0]}
      </InputBox>
      <InputBox>
        <Input
          type="radio"
          name="server"
          id={Object.keys(serverList)[1]}
          checked={serverState === Object.keys(serverList)[1]}
          onChange={chagneServer}
        />
        {Object.values(serverList)[1]}
      </InputBox>
      <InputBox>
        <Input
          type="radio"
          name="server"
          id={Object.keys(serverList)[2]}
          checked={serverState === Object.keys(serverList)[2]}
          onChange={chagneServer}
        />
        {Object.values(serverList)[2]}
      </InputBox>
    </Wrapper>
  );
};

const Wrapper = styled.fieldset`
  display: flex;
  width: 300px;
  justify-content: space-around;
`;

const InputBox = styled.label`
  color: white;
`;

const Input = styled.input`
  margin-right: 3px;
`;

export default ServerSeclector;
