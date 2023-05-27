import { styled } from 'styled-components';

import { TickCircleIcon } from '../../assets';
import { Button } from '../../components/common/Button/Button.styles';
import { Heading } from '../../components/common/Heading/Heading.styles';

const OrderSuccessMessageContainer = styled.div`
  position: relative;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-50%);
`;

const OrderSuccessIcon = styled(TickCircleIcon)`
  width: 64px;
  height: 64px;
  margin-bottom: ${({ theme }) => theme.spacer.spacing4};

  & path {
    stroke: ${({ theme }) => theme.color.primary};
    stroke-width: 1.5;
  }
`;

const SuccessMessageHeading = styled(Heading)`
  margin-bottom: ${({ theme }) => theme.spacer.spacing1};
  font-weight: 500;

  & > span {
    font-weight: bold;
  }
`;

const HomeButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacer.spacing3};
`;

const OrderDetailButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacer.spacing2};
`;

export {
  OrderSuccessMessageContainer,
  OrderSuccessIcon,
  SuccessMessageHeading,
  HomeButton,
  OrderDetailButton,
};
