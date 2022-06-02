import styled from "@emotion/styled";

const StyledSignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 375px;
  margin: 0 auto;

  h2 {
    margin-bottom: 20px;
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

export default StyledSignupContainer;
