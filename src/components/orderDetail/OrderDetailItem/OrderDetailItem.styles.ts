import styled from 'styled-components';
import { css } from 'styled-components';

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacer.spacing4};

  @media screen and (max-width: 600px) {
    gap: ${({ theme }) => theme.spacer.spacing3};
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.color.gray2};
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const ItemContent = styled.div`
  @media screen and (max-width: 600px) {
    & > * {
      width: 208px;
    }
  }

  & > div {
    margin-top: ${({ theme }) => theme.spacer.spacing2};
    display: flex;
    align-items: center;
    letter-spacing: -0.3px;
  }
`;

const VerticalLine = styled.div`
  height: 16px;
  margin-left: ${({ theme }) => theme.spacer.spacing3};
  border-left: 1px solid ${({ theme }) => theme.color.gray2};
`;

const originalPriceStyle = css`
  margin-left: ${({ theme }) => theme.spacer.spacing2};
  color: #b1b3b5;
  font-weight: normal;
  text-decoration: line-through;
`;

const quantityStyle = css`
  margin-left: ${({ theme }) => theme.spacer.spacing3};
`;

export { ItemContainer, ItemImage, ItemContent, VerticalLine, originalPriceStyle, quantityStyle };
