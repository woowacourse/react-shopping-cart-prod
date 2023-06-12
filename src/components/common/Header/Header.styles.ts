import styled from 'styled-components';

import { VerticalLine } from '../../../styles/mixin';
import { Member, RANK } from '../../../types';
import { Button } from '../Button/Button.styles';
import { Text } from '../Text/Text.styles';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacer.spacing3} ${({ theme }) => theme.spacer.spacing4};
  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray2};
  z-index: 2;
`;

const HeaderContentContainer = styled.div`
  position: relative;
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderRightContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > label {
    margin-left: ${({ theme }) => theme.spacer.spacing2};
    margin-right: 72px;
  }
`;

const Logo = styled.img`
  height: 40px;
`;
const RankAndIdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const MemberRank = styled.span<{ rank: Member['rank'] }>`
  display: inline-block;
  min-width: 38px;
  height: 16px px;
  margin-right: 4px;
  padding: 0px 4px;
  border-radius: 30px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  letter-spacing: -0.3px;
  vertical-align: 0px;
  border: 1px solid ${({ theme, rank }) => theme.color.rank[rank]};
  color: ${({ theme, rank }) => theme.color.rank[rank]};
`;

const MemberId = styled(Text)`
  margin-right: 4px;
`;

const OrderPageButton = styled(Button)`
  position: relative;
  width: initial;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DividerLine = styled(VerticalLine)`
  height: 24px;
`;

const CartButton = styled(Button)`
  position: relative;
  width: initial;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CartItemCount = styled.span`
  position: absolute;
  height: 14px;
  right: 8px;
  top: 6px;
  padding: 0px ${({ theme }) => theme.spacer.spacing1};

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.color.orange};
  color: ${({ theme }) => theme.color.white};
  text-align: center;
  font-size: 10px;
  line-height: 12px;
  border-radius: 7px;
  letter-spacing: -0.2px;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  transform: translateX(calc(50% - 7px));
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-bottom: ${({ theme }) => theme.spacer.spacing1};
`;

const HeaderButtonLabel = styled.span`
  font-size: 10px;
  font-weight: 400;
`;

export {
  HeaderContainer,
  HeaderContentContainer,
  HeaderRightContainer,
  RankAndIdContainer,
  Logo,
  MemberRank,
  MemberId,
  OrderPageButton,
  DividerLine,
  CartButton,
  CartItemCount,
  Icon,
  HeaderButtonLabel,
};
