import styled from "@emotion/styled";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  button {
    width: 100%;
    height: 35px;

    border-radius: 4px;

    background-color: ${({ theme }) => theme.colors.mint};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default StyledForm;
