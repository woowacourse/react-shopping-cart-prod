import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Container } from "../../style/style";
import Modal from "../Modal";
import {useRecoilState, useRecoilValue} from "recoil";
import {modalContentState, modalOpenState} from "../../recoil/modalAtoms.tsx";

function HomeLayout() {
  const [isModalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const modalContent = useRecoilValue(modalContentState);
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}

export default HomeLayout;
