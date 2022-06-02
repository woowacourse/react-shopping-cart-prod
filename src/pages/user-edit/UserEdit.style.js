import styled from "@emotion/styled";

const StyledUserEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 375px;
  margin: 0 auto;

  h2 {
    margin-bottom: 20px;
    font-size: 30px;
  }

  .withdrawal {
    margin-top: 15px;
    align-self: flex-end;
    cursor: pointer;
    color: red;
  }
`;

export default StyledUserEditContainer;
