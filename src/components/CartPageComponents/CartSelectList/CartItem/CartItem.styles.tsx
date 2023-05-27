import styled from 'styled-components';
import { ImageContainer, ImageOverflowContainer, ProductItemImage } from '../../../ProductItem/ProductItem.styles.tsx';
import TrashIcon from '../../../@common/TrashIcon/TrashIcon.tsx';
import viewports from '../../../../constants/viewports.ts';

export const CartItem = styled.li`
  display: flex;
  position: relative;
`;

export const ItemImageOverflowContainer = styled(ImageOverflowContainer)`
  width: 144px;
  height: 147px;
  margin-left: 15px;
`;

export const ItemImageContainer = styled(ImageContainer)`
  &::before {
    width: 144px;
    height: 147px;
  }
`;

export const ItemImage = styled(ProductItemImage)`
  width: 144px;
  height: 147px;
`;

export const ItemTitle = styled.span`
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  margin-left: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media screen and (max-width: ${viewports.md}) {
    width: 30%;
  }
`;

export const itemFunctionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
`;

export const DeleteButton = styled.button`
  border: none;
  background-color: transparent;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const TrashLogo = styled(TrashIcon)`
  width: 24px;
  height: 24px;
  align-self: flex-end;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const CartItemBorder = styled.hr`
  width: 100%;
  height: 3.3px;
  border: none;
  border-radius: 10px;

  background: linear-gradient(90deg, transparent, var(--color-header), transparent);
  background-size: 200% 200%;
`;
