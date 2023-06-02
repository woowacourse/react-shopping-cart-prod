import Icon from "../Icon.tsx";
import { IoPerson } from "react-icons/io5";
import {
  LoginTitle,
  MemberId,
  MemberList,
  MemberWrapper,
} from "./Login.style.ts";
import { useRecoilValue } from "recoil";
import { userRepository } from "../../recoil/userAtom.tsx";
import type { Sign } from "../../types/types.ts";

function Login() {
  const members: Sign[] = [
    {
      id: "a@a.com",
      password: "1234",
    },
    {
      id: "b@b.com",
      password: "1234",
    },
  ];

  const { login } = useRecoilValue(userRepository);

  return (
    <div>
      <LoginTitle>로그인</LoginTitle>
      <MemberList>
        {members.map((member) => (
          <MemberWrapper key={member.id} onClick={() => login(member)}>
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
