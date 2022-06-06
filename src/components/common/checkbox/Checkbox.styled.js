import styled from "@emotion/styled";

const StyledCheckbox = styled.input`
  appearance: none;
  border: 1px solid ${({ theme: {colors} }) => colors.mint};
  border-radius: 2px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  align-self: start;

  &:focus {
    outline: none;
  }

  &:checked {
    background-color: ${({ theme: {colors} }) => colors.mint};
  }

  &:after {
    content: "✔";
    width: 100%;
    height: 100%;
    font-size: 0.75rem;
    color: ${({ theme: {colors} }) => colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default StyledCheckbox;
