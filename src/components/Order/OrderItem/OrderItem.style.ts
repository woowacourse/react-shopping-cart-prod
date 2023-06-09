import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  padding: 32px 24px;
  border-top: 1px solid ${({ theme }) => theme.color.gray400};
`;

export const ItemImage = styled.img`
  width: 142px;
  height: 142px;
`;

export const ItemInfo = styled.div`
  padding: 0 28px;
`;

export const Name = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.color.gray900};
`;

export const ItemSubInfo = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray800};
  padding-top: 12px;
`;
