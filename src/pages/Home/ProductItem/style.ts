import { ImageSkeletonStyle, TextSkeletonStyle } from '@Styles/common/skeleton';
import styled from 'styled-components';

type ContainerProps = {
  width?: string;
};

export const Container = styled.div<ContainerProps>`
  max-width: ${(props) => (props.width ? props.width : '100%')};
  min-width: ${(props) => (props.width ? props.width : '100%')};
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    // 모바일
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 20px;

    :not(:last-child) {
      padding-bottom: 20px;
      border-bottom: 1px solid #dddddd;
    }

    :last-child {
      margin-bottom: 80px;
    }
  }
`;

type LoadingProps = {
  isLoading?: boolean;
};

export const ProductItemImage = styled.img<LoadingProps>`
  height: 230px;
  margin-bottom: 18px;
  object-fit: cover;
  border-radius: 3px;
  ${ImageSkeletonStyle};

  @media only screen and (max-width: 768px) {
    // 모바일
    height: 120px;
    width: 120px;
    margin-bottom: 0px;
  }
`;

export const ProductItemContents = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: flex-start;
  column-gap: 20px;
  color: #4f4f4f;

  @media only screen and (max-width: 768px) {
    // 모바일
    min-width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }
`;

export const ProductItemLayout = styled.div`
  min-width: 100%;
  margin-left: 10px;
`;

export const ProductItemName = styled.div<LoadingProps>`
  line-height: 20px;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${(props) => props.isLoading && TextSkeletonStyle}
`;

export const ProductItemPrice = styled.div<LoadingProps>`
  font-size: 20px;
  margin-top: 5px;
  ${(props) => props.isLoading && TextSkeletonStyle}
`;

export const QuantityControllerWrapper = styled.div`
  justify-self: flex-end;
`;
