import styled from 'styled-components';

export const ProductItemBox = styled.div`
  /*  height: 350px; */
  width: 80%;
  margin: 0 auto;
`;

export const ProductItemImageBox = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  transition: ${(props) => props.theme.transitions.default};
`;

export const ProductItemImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 4px;

  object-fit: cover;
`;

export const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  height: 10rem;

  align-items: center;
`;

export const ProductName = styled.div`
  font-size: 1.6rem;
  margin: 0.5rem 0;
  width: 100%;

  color: ${({ theme }) => theme.primaryColor};

  /* TODO: 변수표현해볼것 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const ProductPrice = styled.div`
  font-size: 2.4rem;
  margin: 0.5rem 0;

  color: ${({ theme }) => theme.darkColor};
`;

export const ProductInfo = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CartStepperWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

