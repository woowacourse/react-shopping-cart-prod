import { ChangeEvent, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { serverSelectState } from "recoil/server";
import { keyframes, styled } from "styled-components";
import { ServerId } from "recoil/server";
import { cartListState } from "recoil/cart";
import { getCartItems } from "api/cartItems";
import { CartProduct } from "types/domain";

const ServerSelector = () => {
  const [serverState, setServerState] = useRecoilState(serverSelectState);
  const changeServer = (e: ChangeEvent<HTMLInputElement>) => {
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
      <label>
        <Input
          type="radio"
          name="server"
          id={Object.keys(serverList)[0]}
          checked={serverState === Object.keys(serverList)[0]}
          onChange={changeServer}
        />
        {Object.values(serverList)[0]}
      </label>
      <label>
        <Input
          type="radio"
          name="server"
          id={Object.keys(serverList)[1]}
          checked={serverState === Object.keys(serverList)[1]}
          onChange={changeServer}
        />
        {Object.values(serverList)[1]}
      </label>
      <label>
        <Input
          type="radio"
          name="server"
          id={Object.keys(serverList)[2]}
          checked={serverState === Object.keys(serverList)[2]}
          onChange={changeServer}
        />
        {Object.values(serverList)[2]}
      </label>
    </Wrapper>
  );
};

const OpenAnimation = keyframes`
  0% {
    transform: translateX(10%);
  }
  100% {
    transform: translateX(0);
  }
`;

const Wrapper = styled.fieldset`
  border-radius: 5px 0 0 5px;
  position: fixed;
  top: 100px;
  right: 0;
  background: #04c09e;
  color: #333333;
  display: flex;

  width: 20px;
  height: 120px;

  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;

  font-size: 16px;

  &: hover {
    width: 120px;
    animation: ${OpenAnimation} 0.5s;

    & > * {
      display: flex;
    }
  }

  & > * {
    display: none;
  }

  @media (max-width: 767px) {
    width: 20px;
    height: 80px;

    font-size: 14px;

    &: hover {
      width: 100px;
    }
  }
`;

const Input = styled.input`
  margin-right: 5px;
  cursor: pointer;
`;

export default ServerSelector;
