import ErrorImg from "@/assets/images/error.png";

import {
  StyledErrorContainer,
  StyledErrorMessage,
} from "@/pages/Error/index.styled";

function Error() {
  return (
    <StyledErrorContainer>
      <img src={ErrorImg} alt="에러 페이지" />
      <StyledErrorMessage>
        에러가 발생했습니다. 관리자에게 문의해주세요.
      </StyledErrorMessage>
    </StyledErrorContainer>
  );
}

export default Error;
