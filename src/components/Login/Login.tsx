import Icon from "../Icon.tsx";
import { IoPerson } from "react-icons/io5";
import styled from "styled-components";

const LoginTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const MemberList = styled.div``;

const MemberWrapper = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  cursor: pointer;

  &:hover {
    background-color: gainsboro;
  }
`;

const MemberId = styled.div`
  font-size: 24px;
  margin-left: 15px;
`;

function Login() {
  const members = [
    {
      id: "a@a.com",
      password: "1234",
    },
    {
      id: "b@b.com",
      password: "1234",
    },
  ];
  return (
    <div>
      <LoginTitle>로그인</LoginTitle>
      <MemberList>
        {members.map((member) => (
          <MemberWrapper key={member.id}>
            <Icon fontSize={30}>
              <IoPerson />
            </Icon>
            <MemberId>{member.id}</MemberId>
          </MemberWrapper>
        ))}
      </MemberList>
    </div>
  );
}

export default Login;
