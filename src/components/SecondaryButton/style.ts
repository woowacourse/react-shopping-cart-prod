import styled from 'styled-components';

export const Button = styled.button`
  background-color: #ffffff;
  border: 1px solid #23a6a2;
  padding: 5px 10px;
  transition: background-color 0.1s ease, color 0.1s ease;
  cursor: pointer;
  :hover {
    background-color: #23a6a2;
    color: #ffffff;
  }
`;
