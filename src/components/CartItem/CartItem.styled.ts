import styled from 'styled-components';

const CartItem = styled.div`
  width: 100%;
  padding-top: 20px;
  border-top: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  img {
    aspect-ratio: 1 / 1;
    height: 110px;
    margin: 0 10px;
  }
`;

const ProductName = styled.div`
  position: relative;
  top: -105px;
  left: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  width: 310px;
`;

const DeleteButton = styled.button`
  position: relative;
  top: -125px;
  float: right;

  background: none;
`;

const Price = styled.div`
  position: relative;
  top: -35px;
  left: 105px;
  float: right;

  font-size: 14px;
`;

export { CartItem, ProductName, DeleteButton, Price };
