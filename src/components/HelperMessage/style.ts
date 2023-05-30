import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 5px;
`;

export const Layout = styled.div`
  position: relative;
`;

export const QuestionMark = styled.div`
  position: relative;
  top: -1px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 700;
  width: 16px;
  height: 16px;

  color: #23a6a2;
  border: 1px solid #23a6a2;
  border-radius: 50%;
  user-select: none;
`;

export const HelperMessage = styled.div`
  z-index: 1;
  user-select: none;
  position: absolute;
  text-align: center;
  left: -90px;
  bottom: 25px;
  min-width: 320px;
  max-width: 320px;
  font-size: 14px;
  line-height: 120%;
  background-color: #fcfcfc;
  border: 1px solid #23a6a2;
  border-radius: 4px;
  padding: 10px;
`;
