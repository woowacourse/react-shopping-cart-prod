import styled from "@emotion/styled";

const StyledSigninContainer = styled.div`
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

  .please-signup {
    margin-top: 30px;
    align-self: flex-start;

    a {
      margin-left: 5px;
      color: ${({ theme }) => theme.colors.blue_500};
    }
  }
`;

export default StyledSigninContainer;
