import { ImageSkeletonStyle, TextSkeletonStyle } from '@Styles/common/skeleton';
import styled from 'styled-components';

type ContainerProps = {
  width: string;
};

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  column-gap: 20px;
  width: ${(props) => props.width};
  background-color: #ffffff;
  padding: 20px 0px 30px 0px;

  :first-child {
    border-top: 2px solid #aaaaaa;
  }

  :last-child {
    border-bottom: 2px solid #aaaaaa;
  }
`;

type LoadingProps = {
  isLoading?: boolean;
};

export const ShoppingItemImage = styled.img<LoadingProps>`
  width: 150px;
  height: 150px;
  object-fit: cover;
  ${ImageSkeletonStyle};
`;

export const ShoppingItemName = styled.div<LoadingProps>`
  color: ${(props) => props.theme.color.gray100};
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  ${(props) => props.isLoading && TextSkeletonStyle}
`;

export const RightContents = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-items: flex-end;
`;

export const DeleteButton = styled.img`
  align-self: flex-start;
  cursor: pointer;
`;

export const ShoppingItemPrice = styled.div<LoadingProps>`
  align-self: flex-end;
  color: ${(props) => props.theme.color.gray100};
  font-weight: 400;
  line-height: 24px;
  ${(props) => props.isLoading && TextSkeletonStyle}
`;
