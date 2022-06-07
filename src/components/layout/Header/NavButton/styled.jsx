import styled from "styled-components";

export const UnderlinedButton = styled.button`
  padding: 0 12px 12px;

  background-color: transparent;
  border: none;
  color: ${({ theme: { color } }) => color.main};
  font-size: ${({ theme: { fontSize } }) => fontSize.large};
  text-align: center;
  cursor: pointer;

  :hover {
    border-bottom: 2px solid ${({ theme: { color } }) => color.main};
  }
`;
