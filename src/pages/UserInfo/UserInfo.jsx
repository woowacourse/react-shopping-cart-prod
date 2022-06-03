import React from 'react';

import { useModal } from 'hooks/useModal';

import { Modal, PageTitle } from 'components/common';

import DeleteUserForm from 'components/user/DeleteUserForm/DeleteUserForm';
import UserInfoSection from 'components/user/UserInfoSection/UserInfoSection';

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
