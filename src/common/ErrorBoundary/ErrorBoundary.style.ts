import { styled } from "styled-components";

export const BoundaryContainer = styled.main`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: ${({ theme }) => theme.primaryColor};

  text-align: center;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

export const Message = styled.p`
  margin: 1rem;
  width: 100%;
  font-size: 1.8rem;
`;
