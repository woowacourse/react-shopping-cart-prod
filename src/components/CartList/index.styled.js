import styled from "@emotion/styled";

const StyledCartList = styled.section`
  width: 90%;
  margin: 40px auto 0;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .checkbox-container {
      display: flex;

      .checkbox-label {
        padding-left: 7px;
      }
    }

    button {
      width: 80px;
      height: 40px;
      cursor: pointer;

      border: 1px solid ${({ theme }) => theme.colors.gray4};
    }
  }

  @media (min-width: 800px) {
    width: 80%;
  }
`;

export default StyledCartList;
