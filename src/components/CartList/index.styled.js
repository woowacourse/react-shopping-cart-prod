import styled from "@emotion/styled";

const StyledProductList = styled.section`
  width: 60%;
  margin-top: 50px;

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
`;

export default StyledProductList;
