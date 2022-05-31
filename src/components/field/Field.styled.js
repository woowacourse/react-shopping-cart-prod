import styled from "@emotion/styled";

const StyledField = styled.div`
  display: flex;
  flex-direction: column;

  .field__header {
    display: flex;
    justify-content: space-between;

    .error__message {
      color: #f60579;
      font-size: 14px;
    }
  }

  label {
    color: #8c8c8c;
    margin-bottom: 5px;
  }
`;

export default StyledField;
