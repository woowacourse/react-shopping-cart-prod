import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index: 1002;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dimmer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000080;
  z-index: 1003;
  cursor: pointer;
`;

export const Contents = styled.div`
  background-color: ${({ theme }) => theme.COLOR.WHITE};
  width: 50%;
  min-width: 300px;
  max-width: 400px;
  min-height: 300px;
  height: auto;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  z-index: 1004;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 8px;
  margin-right: 8px;
  color: ${({ theme }) => theme.COLOR.PRIMARY_RED};
  cursor: pointer;
`;

export const ChildrenWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
