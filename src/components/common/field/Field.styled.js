import styled from "@emotion/styled";

const StyledField = styled.div`
  display: flex;
  flex-direction: column;

  .field__header {
    display: flex;
    justify-content: space-between;

    .error__message {
      color: ${({ theme: {colors} }) => colors.pink};
      font-size: ${({ theme: {fontSize} }) => fontSize.xs};
    }
  }

  label {
    color: ${({ theme: {colors} }) => colors.gray1};
    margin-bottom: 5px;
  }
`;

export default StyledField;
