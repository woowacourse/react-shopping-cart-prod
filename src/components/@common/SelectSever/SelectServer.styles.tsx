import styled from 'styled-components';

export const SelectBox = styled.select`
  width: 60px;

  padding: 10px 0;
  margin-right: 5px;
  font: ${(props) => props.theme.font.small};
  border: 1px solid ${(props) => props.theme.color.gray};
  border-radius: 4px;
`;
