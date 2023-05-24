import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import { serverSelectState } from "recoil/server";
import { styled } from "styled-components";
import { ServerId } from "recoil/server";

const ServerSeclector = () => {
  const setServerState = useSetRecoilState(serverSelectState);
  const changeEvent = (e: ChangeEvent<HTMLFieldSetElement>) => {
    setServerState(e.target.id as ServerId);
  };

  const serverList: { [key in ServerId]: string } = {
    "power-server": "파워 서버",
    "ttaengchil-server": "땡칠 서버",
    "ori-server": "오리 서버",
  };

  return (
    <Wrapper onChange={changeEvent}>
      <InputBox>
        <Input type="radio" name="server" id={Object.keys(serverList)[0]} defaultChecked />
        {Object.values(serverList)[0]}
      </InputBox>
      <InputBox>
        <Input type="radio" name="server" id={Object.keys(serverList)[1]} />
        {Object.values(serverList)[1]}
      </InputBox>
      <InputBox>
        <Input type="radio" name="server" id={Object.keys(serverList)[2]} />
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
