import { theme } from "style";

import DefaultButton from "components/common/Button/DefaultButton";
import UserInput from "components/common/UserInput";
import {
  ModalButtonContainer,
  ModalDimmedConatiner,
  ModalLabel,
  ModalParagraph,
  ModalTitle,
  ModalWindow,
} from "./styled";

function DeleteAccountModal({
  userName = "%ERROR%",
  onClose,
  onConfirm,
  errorMessage,
  passwordRef,
}) {
  return (
    <ModalDimmedConatiner onClick={onClose}>
      <ModalWindow onClick={(event) => event.stopPropagation()}>
        <ModalTitle>{userName}님, 정말 탈퇴하시겠어요?</ModalTitle>
        <ModalParagraph>
          지금 탈퇴하시면 구매 내역과 모든 장바구니 목록이 삭제돼요! 앞으로 회원
          혜택도 받을 수 없습니다.
        </ModalParagraph>
        <ModalLabel>떠나시려면 비밀번호를 입력해주세요 :(</ModalLabel>
        <UserInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          width="100%"
          errorMessage={errorMessage}
          ref={passwordRef}
        />
        <ModalButtonContainer>
          <DefaultButton width="180px" onClick={onClose}>
            닫기
          </DefaultButton>
          <DefaultButton
            width="180px"
            bgColor={theme.color.main}
            textColor={theme.color.point}
            onClick={onConfirm}
          >
            떠나기
          </DefaultButton>
        </ModalButtonContainer>
      </ModalWindow>
    </ModalDimmedConatiner>
  );
}

export default DeleteAccountModal;
