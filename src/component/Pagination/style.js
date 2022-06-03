import styled from 'styled-components';

const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;

  button {
    color: ${({theme}) => theme.WHITE};
    font-size: 18px;
    background: none;
    border: none;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  button:hover {
    background: ${({theme}) => theme.GRAY_500};
    border-radius: 5px;
  }

  button.active {
    background: ${({theme}) => theme.MINT_500};
  }

  .control-button {
    color: ${({theme}) => theme.BLACK};
  }
`;

export default PaginationStyled;
