import { styled } from "styled-components";

const ServerSeclector = () => {
  return (
    <Wrapper>
      <InputBox>
        <Input type="radio" name="server" id="power-server" defaultChecked/>
        파워 서버
      </InputBox>
      <InputBox>
        <Input type="radio" name="server" id="ttaengchil-server" />
        땡칠 서버
      </InputBox>
      <InputBox>
        <Input type="radio" name="server" id="ori-server" />
        오리 서버
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
