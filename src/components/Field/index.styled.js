import styled from "@emotion/styled";

const StyledField = styled.div`
  display: flex;
  flex-direction: column;

  .field__header {
    display: flex;
    justify-content: space-between;

    .error__message {
      color: ${({ theme }) => theme.colors.pink};
      font-size: ${({ theme }) => theme.fontSize.xs};
    }
  }

  label {
    color: ${({ theme }) => theme.colors.gray1};
    margin-bottom: 5px;
  }
`;

export default StyledField;
