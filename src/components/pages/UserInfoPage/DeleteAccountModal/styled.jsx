import styled from "styled-components";

export const ModalDimmedConatiner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme: { color } }) => `${color.gray01}66`};
`;

export const ModalWindow = styled.div`
  width: 440px;
  height: fit-content;
  padding: 24px;

  border-radius: 10px;
  background-color: ${({ theme: { color } }) => color.main};
`;

export const ModalTitle = styled.h3`
  padding: 16px 0;

  font-size: ${({ theme: { fontSize } }) => fontSize.large};
  color: ${({ theme: { color } }) => color.gray01};
`;

export const ModalParagraph = styled.p`
  padding: 8px 0;

  color: ${({ theme: { color } }) => color.gray01};
  font-size: ${({ theme: { fontSize } }) => fontSize.small};
  line-height: 24px;
`;

export const ModalLabel = styled.label`
  display: block;
  padding: 16px 0 8px;

  color: ${({ theme: { color } }) => color.gray01};
`;

export const ModalButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;
