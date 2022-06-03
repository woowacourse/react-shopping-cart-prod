import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    width: 190px;
    position: relative;
    cursor: pointer;
  `,

  ProductController: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 47px;
    padding-left: 5px;
  `,

  ProductName: styled.p`
    font-weight: 400;
    letter-spacing: 0.5px;
    font-size: 11px;
    line-height: 22px;
    width: 120px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  ProductPrice: styled.p`
    font-weight: 400;
    letter-spacing: 0.5px;
    font-size: 14px;
    line-height: 17px;
    width: 120px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  Quantity: styled.div`
    background-color: ${({ theme }) => theme.colors.mint_001};
    width: 30px;
    height: 30px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.white};
    margin-right: 10px;
  `,

  CartController: styled.div`
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
  `,
};

export default Styled;
