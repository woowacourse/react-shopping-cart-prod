// @ts-nocheck
import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    width: 460px;
    height: 133px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    display: flex;
    padding: 20px;
    margin-top: -1px;
  `,

  InformationContainer: styled.div`
    margin-left: 15px;
    color: ${({ theme }) => theme.colors.gray_006};
    letter-spacing: 1px;
  `,

  ProductName: styled.p`
    font-size: 15px;
  `,

  ProductQuantity: styled.p`
    margin-top: 30px;
    font-size: 12px;
  `,
};

export default Styled;
