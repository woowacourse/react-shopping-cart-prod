import styled from 'styled-components';

export const Container = styled.div`
  width: 360px;
  padding: 24px;
  border: 1px solid ${(props) => props.theme.color.gray};
`;

export const Title = styled.p`
  padding-bottom: 20px;
  font: ${(props) => props.theme.font.medium};
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.color.gray};
`;

export const CouponWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const CheckBox = styled.input`
  width: 28px;
  height: 28px;
  border: 1px solid ${(props) => props.theme.color.secondary};
  border-radius: 50%;
  cursor: pointer;

  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg width='23' height='17' viewBox='0 0 23 17' fill='none' xmlns='http://www.w3.org/2000/svg'%0A%3E%3Cpath d='M2 7L9.11069 14.1107L21.8318 1.38956' stroke='white' stroke-width='3' /%3E%3C/svg%3E");
    background-size: 80% 80%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${(props) => props.theme.color.secondary};
  }

  @media (min-width: 320px) and (max-width: 479px) {
    width: 20px;
    height: 20px;
  }
`;

export const CouponName = styled.p`
  margin-left: 20px;
  font: ${(props) => props.theme.font.small};
`;
