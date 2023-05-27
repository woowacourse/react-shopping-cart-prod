import { CartItemContainer } from '@views/Cart/components/CartItemBox/CartItemBox.style';
import {
  PayingBox,
  PayingContainer,
} from '@views/Payment/components/ExpectedPayment/ExpectedPayment.style';
import { styled } from 'styled-components';
import { CartWrapper } from '../CartItemList/CartItemList.style';

export const SkeletonWrapper = CartWrapper;

export const SkeletonPayingContainer = PayingContainer;

export const SkeletonImage = styled(CartItemContainer)`
  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;
  animation: skeleton-animation 5s infinite ease-out;
  border: none;

  margin-bottom: 1rem;

  padding-left: 50%;
  padding-top: 30%;

  @keyframes skeleton-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const SkeletonPayingBox = styled(PayingBox)`
  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;
  animation: skeleton-animation 5s infinite ease-out;
  border: none;

  margin-bottom: 1rem;

  padding-left: 50%;
  padding-top: 50%;

  @keyframes skeleton-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
