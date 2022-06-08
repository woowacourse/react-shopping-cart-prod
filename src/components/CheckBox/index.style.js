import styled from 'styled-components';

const Styled = {
  Container: styled.label`
    display: block;
    height: 17px;
    width: 17px;
    border-radius: 2px;
    position: relative;
    border: 1px solid ${({ theme }) => theme.colors.mint_002};
    cursor: pointer;

    input {
      display: none;
    }
  `,

  CheckMark: styled.span`
    position: absolute;
    height: 17px;
    width: 17px;

    input:checked ~ & {
      background-color: ${({ theme }) => theme.colors.mint_002};
    }

    &:after {
      content: '';
      position: absolute;
      left: 5px;
      top: 2px;
      width: 5px;
      height: 8px;
      border: solid ${({ theme }) => theme.colors.white};
      border-width: 0 1.5px 1.5px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  `,
};

export default Styled;
