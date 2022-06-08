import styled from "@emotion/styled";

const StyledUrlSelectorContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 180px;
  left: 30px;
  top: 100px;
  border: 2px solid black;
  background-color: #ccc;
  padding: 10px;
  border: none;
  border-radius: 10px;

  button {
    font-size: 24px;
    width: 100%;
  }

  button:hover {
    background-color: white;
    transform: scale(1.2);
  }

  div {
    padding: 10px;
    margin-bottom: 10px;
  }

  @media (max-width: 1600px) {
    display: none;
  }
`;

export default StyledUrlSelectorContainer;
