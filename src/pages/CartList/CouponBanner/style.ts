import styled from 'styled-components';

export const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 0px 60px;

  font-size: 24px;
  font-weight: 700;
  background-color: ${(props) => props.theme.color.gray100};
  color: white;

  cursor: pointer;
`;
