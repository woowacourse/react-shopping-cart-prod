import styled from 'styled-components';

export const Contents = styled.ul<{ listLength: number }>`
  display: flex;
  flex-direction: row;

  width: ${(props) => props.listLength * 100}%;

  transition: 'all 500ms ease-in-out';
`;

export const Content = styled.li`
  width: 860px;
`;

export const LeftButton = styled.button`
  position: absolute;
  left: 20px;

  height: 40px;
  width: 25px;
  border-radius: 10px;
  background-color: rgba(240, 240, 240, 0.7);
  cursor: pointer;

  z-index: ${(props) => props.theme.zIndex.middle};
`;

export const RightButton = styled.button`
  position: absolute;
  right: 20px;

  height: 40px;
  width: 25px;
  border-radius: 10px;
  background-color: rgba(240, 240, 240, 0.7);
  cursor: pointer;

  z-index: ${(props) => props.theme.zIndex.middle};
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  margin-top: 30px;
  overflow: hidden;

  font-size: 20px;
  background-color: lightblue;

  z-index: ${(props) => props.theme.zIndex.back};
`;
