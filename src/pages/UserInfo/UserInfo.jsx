import React from 'react';

import { Modal, PageTitle } from 'components/common';

import { useModal } from 'hooks/useModal';
import UserInfoSection from 'components/user/UserInfoSection/UserInfoSection';
import DeleteUserForm from 'components/user/DeleteUserForm/DeleteUserForm';

function UserInfo() {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <PageTitle>내 정보</PageTitle>
      <UserInfoSection openModal={openModal} />
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <DeleteUserForm closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default UserInfo;
