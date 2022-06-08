import styled from 'styled-components';

const CartItem = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  padding-top: 20px;

  img {
    height: 110px;
    aspect-ratio: 1 / 1;

    margin: 0 10px;
  }
`;

const ProductName = styled.div`
  display: -webkit-box;
  position: relative;
  top: -105px;
  left: 150px;

  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
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
