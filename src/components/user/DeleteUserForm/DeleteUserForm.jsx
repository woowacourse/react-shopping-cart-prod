import React from 'react';

import { Button } from 'components/common';

import * as Styled from 'components/user/DeleteUserForm/DeleteUserForm.style';
import { useDispatch } from 'react-redux';
import { deleteUserThunk } from 'store/actions/user';
import { useNavigate } from 'react-router-dom';

function DeleteUserForm({ closeModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteUser = () => {
    try {
      dispatch(deleteUserThunk());

      navigate('/');
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <Styled.Container>
      <Styled.Title>정말 탈퇴하시겠습니까?</Styled.Title>
      <Styled.Description>
        회원 탈퇴 시 모든 사용 정보가 삭제되며 <br />
        삭제된 정보는 복구될 수 없습니다.
      </Styled.Description>
      <Styled.ButtonContainer>
        <Button onClick={closeModal}>계속 함께하기</Button>
        <Button variant="warning" onClick={handleDeleteUser}>
          영영 떠나가기
        </Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
}

export default DeleteUserForm;
