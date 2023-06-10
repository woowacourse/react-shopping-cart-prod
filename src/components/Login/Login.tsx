import Icon from "../Icon.tsx";
import { IoPerson } from "react-icons/io5";
import {
  LoginTitle,
  MemberId,
  MemberList,
  MemberWrapper,
} from "./Login.style.ts";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { User } from "../../types/types.ts";
import { serverState } from "../../app/recoil/serverAtom.ts";
import { fetchMembers } from "../../app/api/api.ts";
import { userRepository } from "../../app/recoil/user/userRepository.tsx";

function Login() {
  const { login } = useRecoilValue(userRepository);
  const server = useRecoilValue(serverState);
  const [members, setMembers] = useState<User[]>([]);

  const loadMembers = async () => {
    const data = await fetchMembers(server);
    setMembers(data);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div>
      <LoginTitle>로그인</LoginTitle>
      <MemberList>
        {members.length === 0 ? (
          <div>로그인 할 수 있는 계정이 서버에 존재하지 않습니다.</div>
        ) : (
          members.map((member) => (
            <MemberWrapper key={member.id} onClick={() => login(member)}>
              <Icon fontSize={30}>
                <IoPerson />
              </Icon>
              <MemberId>{member.name}</MemberId>
            </MemberWrapper>
          ))
        )}
      </MemberList>
    </div>
  );
}

export default Login;
