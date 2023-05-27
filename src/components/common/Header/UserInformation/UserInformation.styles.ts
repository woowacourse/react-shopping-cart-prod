import { styled } from 'styled-components';

const UserInformationContainer = styled.div`
  position: relative;
  max-width: 1080px;
  margin: 0 auto;
  margin-bottom: 14px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacer.spacing1};
`;

const UserRank = styled.span`
  display: inline-block;
  min-width: 38px;
  height: 16px;
  margin-right: ${({ theme }) => theme.spacer.spacing1};
  padding: 0 ${({ theme }) => theme.spacer.spacing1};
  border-radius: 30px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  color: ${({ theme }) => theme.color.primaryDark};
  border: 1px solid ${({ theme }) => theme.color.primaryDark};
  background-color: ${({ theme }) => theme.color.white};
`;

const OrderLink = styled.span`
  color: ${({ theme }) => theme.color.black};
  font-size: 12px;
  letter-spacing: -0.2px;
  line-height: 20px;
`;

const UserInformationContentSkeleton = styled.span`
  width: 86px;
  min-height: 21px;

  &.skeleton::after {
    font-size: 0;
    content: 'loading';
  }
`;

export { UserInformationContainer, UserRank, OrderLink, UserInformationContentSkeleton };
