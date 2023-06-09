import { MouseEventHandler, useRef, useState } from 'react';
import * as S from './UserSelector.style.ts';
import UserProfileImage from '../../../../assets/user.svg';
import useOnClickOutside from '../../../../hooks/useOnClickOutside.ts';
import type { Point } from '../../../../types/types.ts';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { memberIdState, memberListState } from '../../../../recoil/userAtoms.ts';
import { orderState } from '../../../../recoil/orderAtom.ts';

type UserSelectorProps = {
  point: Point;
};

const UserSelector = ({ point }: UserSelectorProps) => {
  const [currentMemberId, setCurrentMemberId] = useRecoilState(memberIdState);
  const memberList = useRecoilValue(memberListState);
  const setOrderState = useSetRecoilState(orderState);

  const currentMemberInfo = memberList?.find((member) => member.id === currentMemberId);

  const changeCurrentUser: MouseEventHandler<HTMLLIElement> = (e) => {
    setCurrentMemberId(e.currentTarget.value);
    setOrderState(null);
  };

  const ref = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);

  const close = () => setMenu(false);

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  useOnClickOutside<HTMLDivElement>(ref, close);

  return (
    <S.Wrapper ref={ref}>
      <S.UserProfileButton onClick={toggleMenu}>
        <S.UserProfileImage src={UserProfileImage} alt='user image' />
        <S.UserName>{currentMemberInfo?.name}</S.UserName>
      </S.UserProfileButton>
      {memberList && (
        <S.Menu isOpen={menu}>
          {currentMemberInfo && (
            <S.UserInfoWrapper>
              <S.UserInfoName>{currentMemberInfo.name}</S.UserInfoName>
              <S.UserInfoId>{currentMemberInfo.email}</S.UserInfoId>
              {point && <S.UserInfoPoint>보유 포인트: {point.totalPoint.toLocaleString()}p</S.UserInfoPoint>}
            </S.UserInfoWrapper>
          )}
          <S.UserListWrapper>
            <S.UserListTitle>계정 전환</S.UserListTitle>
            {memberList
              .filter((member) => member.id !== currentMemberId)
              .map((user) => (
                <S.User key={user.id} value={user.id} onClick={changeCurrentUser}>
                  <S.UserInfoName>{user.name}</S.UserInfoName>
                  <S.UserInfoId>{user.email}</S.UserInfoId>
                </S.User>
              ))}
          </S.UserListWrapper>
        </S.Menu>
      )}
    </S.Wrapper>
  );
};

export default UserSelector;
