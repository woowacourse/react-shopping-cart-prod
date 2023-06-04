import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { serverState } from '../../store/ServerState';
import { MemberTypes } from '../../types';
import { MEMBER_BASE_URL } from '../../constants/url';
import { useFetchData } from '../../hooks/useFetchData';

const Member = () => {
  const [member, setMember] = useState<MemberTypes | undefined>();
  const serverUrl = useRecoilValue(serverState);
  const { api } = useFetchData<MemberTypes | undefined>(setMember);

  useEffect(() => {
    api.get(`${serverUrl}${MEMBER_BASE_URL}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverUrl]);

  return (
    <>
      <S.TitleContainer>
        <S.Title>마이 정보</S.Title>
      </S.TitleContainer>
      <S.EmailInfoContainer>
        <S.Email>아이디(이메일)</S.Email>
        <S.InfoContainer>{member?.email}</S.InfoContainer>
      </S.EmailInfoContainer>
      <S.PointInfoContainer>
        <S.Point>보유 포인트</S.Point>
        <S.InfoContainer>{member?.point}</S.InfoContainer>
      </S.PointInfoContainer>
    </>
  );
};

const S = {
  TitleContainer: styled.section`
    position: fixed;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    transform: translate(-45%, 0);
    background-image: linear-gradient(-45deg, var(--mint-color-002) 0%, var(--mint-color-003) 100%);
    transition: 1s ease-in-out;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-bottom-right-radius: max(50vw, 50vh);
  `,

  Title: styled.h1`
    position: relative;
    top: 10%;
    left: 50%;
    right: 60%;
    font-weight: 900;
    font-size: 6rem;
    color: var(--white-color);

    @media (max-width: 768px) {
      font-size: 5rem;
    }

    @media (max-width: 650px) {
      font-size: 4rem;
    }

    @media (max-width: 515px) {
      font-size: 3rem;
    }
  `,

  EmailInfoContainer: styled.div`
    position: fixed;
    top: 30%;
    left: 60%;
    width: 70%;
  `,

  Email: styled.span`
    margin-bottom: 20px;
  `,

  PointInfoContainer: styled.div`
    position: fixed;
    top: 50%;
    left: 60%;
    width: 70%;
  `,

  Point: styled.span``,

  InfoContainer: styled.section`
    width: 30%;
    z-index: 9999;
    margin-top: 10px;
    padding: 1rem;
    background-color: var(--white-color);
    border-radius: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.55) 0px 5px 15px;
    transition: 0.5 ease-in-out;
    transition-delay: 1s;
  `,
};

export default Member;
