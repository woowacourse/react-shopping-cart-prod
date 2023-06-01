import { TextSkeletonStyle } from '@Styles/common/skeleton';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 30px);
  row-gap: 20px;
`;

type isLoadingProps = {
  isLoading?: boolean;
};

export const Text = styled.div<isLoadingProps>`
  ${(props) => props.isLoading && TextSkeletonStyle}
`;

export const Amount = styled.div<isLoadingProps>`
  ${(props) => props.isLoading && TextSkeletonStyle}
`;

export const AmountWrapper = styled.div`
  display: grid;
  justify-items: end;
  row-gap: 5px;
`;

export const DiscountLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: self-start;

  :last-child {
    margin-top: 20px;
    font-weight: 700;
  }
`;
