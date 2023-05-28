import styled from 'styled-components';

import { Text } from '../../common/Text/Text.styles';

const CartCheckoutBoxWrapper = styled.aside`
  position: relative;
  width: 284px;
  padding-top: 40px;

  @media screen and (max-width: 1200px) {
    width: calc(100vw - 48px);
  }
`;

const CheckoutInformationContainer = styled.div`
  position: sticky;
  top: 133px;
  padding: ${({ theme }) => theme.spacer.spacing4};
  background-color: ${({ theme }) => theme.color.gray1};
  border-radius: ${({ theme }) => theme.borderRadius.small};

  & .loading-button {
    height: 49.5px;
  }
`;

const CheckoutInformationTextContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacer.spacing3};
  display: flex;
  justify-content: space-between;
`;

const CheckoutValueText = styled(Text)`
  letter-spacing: -0.2px;
`;

const CheckoutInformationSubTextContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacer.spacing3};
  display: flex;
  justify-content: space-between;

  & > * {
    color: ${({ theme }) => theme.color.gray4};
  }
`;

const CheckoutMembershipDiscountInformation = styled.div`
  margin-bottom: ${({ theme }) => theme.spacer.spacing4};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacer.spacing2};

  & > span {
    color: ${({ theme }) => theme.color.gray4};
  }
`;

const MembershipRank = styled.span`
  margin-right: ${({ theme }) => theme.spacer.spacing1};
  padding: 0px 6px;
  color: ${({ theme }) => theme.color.primary} !important;
  font-size: 10px;
  font-weight: 500;
  line-height: 18px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.primary};
`;

const CheckoutTotalPriceContainer = styled(CheckoutInformationTextContainer)`
  margin-top: ${({ theme }) => theme.spacer.spacing4};
`;

const CheckoutTotalPriceValueText = styled(CheckoutValueText)`
  font-weight: 600;
`;

export {
  CartCheckoutBoxWrapper,
  CheckoutInformationContainer,
  CheckoutInformationTextContainer,
  CheckoutTotalPriceContainer,
  CheckoutInformationSubTextContainer,
  CheckoutMembershipDiscountInformation,
  MembershipRank,
  CheckoutValueText,
  CheckoutTotalPriceValueText,
};
