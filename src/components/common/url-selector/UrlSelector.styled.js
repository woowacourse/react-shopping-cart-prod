import styled from "@emotion/styled";

const StyledUrlSelectorContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 30px;
  top: 100px;
  border: 2px solid black;

  button {
    font-size: 24px;
  }

  @media (max-width: 1600px) {
    display: none;
  }
`;

export default StyledUrlSelectorContainer;
