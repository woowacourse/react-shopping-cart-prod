import {styled} from "styled-components";

export const WrapperContent = styled.div`
  display: flex;
  column-gap: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;

  border-bottom: ${({ theme }) => theme.secondaryColor} 1px solid;
`;

export const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  aspect-ratio: 1/1;
  border-radius: 4px;

  object-fit: cover;
`;

export const ItemInfoWrapper = styled.div`
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
`;

export const ItemTitle = styled.div`
  font-size: 1.6rem;
`;

export const ItemInfo = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.secondaryColor};
`;