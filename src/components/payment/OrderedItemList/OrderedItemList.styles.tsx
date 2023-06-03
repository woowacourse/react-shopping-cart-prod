import styled from 'styled-components';

export const ItemWrapper = styled.ul`
  width: 90%;
  margin: 0 auto;
`;

export const EmptyList = styled.p`
  color: ${(props) => props.theme.color.gray};
  font: ${(props) => props.theme.font.medium};

  text-align: center;
`;
