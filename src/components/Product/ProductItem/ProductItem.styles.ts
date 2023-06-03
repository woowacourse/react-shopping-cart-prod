import styled from 'styled-components';

export const ItemWrapper = styled.div`
  width: 224px;
  height: 320px;
`;

export const ItemImage = styled.img`
  width: 224px;
`;

export const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProductName = styled.p`
  font: ${(props) => props.theme.font.small};
`;

export const ProductPrice = styled.p`
  font: ${(props) => props.theme.font.medium};
`;

export const DiscountPercent = styled.span`
  margin-right: 8px;
  font: ${(props) => props.theme.font.small};
  color: #fa622f;
`;

export const DiscountPrice = styled.p`
  font: ${(props) => props.theme.font.small};
  color: ${(props) => props.theme.color.gray};
  text-decoration: line-through;
`;
