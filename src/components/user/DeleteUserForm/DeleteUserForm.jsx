import React from 'react';

import { Button } from 'components/common';

import * as S from 'components/user/DeleteUserForm/DeleteUserForm.style';
import { useDispatch } from 'react-redux';
import { deleteUserThunk } from 'store/actions/user.action';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'constants/route';

function DeleteUserForm({ closeModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteUser = () => {
    try {
      dispatch(deleteUserThunk());

      navigate(ROUTE.HOME);
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <S.Container>
      <S.Title>정말 탈퇴하시겠습니까?</S.Title>
      <S.Description>
        회원 탈퇴 시 모든 사용 정보가 삭제되며 <br />
        삭제된 정보는 복구될 수 없습니다.
      </S.Description>
      <S.ButtonContainer>
        <Button onClick={closeModal}>계속 함께하기</Button>
        <Button variant="warning" onClick={handleDeleteUser}>
          영영 떠나가기
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default DeleteUserForm;
