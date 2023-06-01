import { styled } from 'styled-components';

import { TickCircleIcon } from '../../assets/svg';
import { Button } from '../../components/common/Button/Button.styles';
import { Text } from '../../components/common/Text/Text.styles';

const OrderSuccessMessageContainer = styled.div`
  position: relative;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-50%);

  & > .heading {
    margin-bottom: ${({ theme }) => theme.spacer.spacing1};
    font-weight: 500;

    & > span {
      font-weight: bold;
    }
  }
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

const OrderSuccessIdText = styled(Text)`
  margin: ${({ theme }) => theme.spacer.spacing2} 0;
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
  OrderSuccessIdText,
  HomeButton,
  OrderDetailButton,
};
