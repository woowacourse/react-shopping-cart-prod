import styled from "styled-components";
import Item from "components/Item";
import { useRecoilValue } from "recoil";
import { productListState } from "recoil/product";

const ItemList = () => {
  const productList = useRecoilValue(productListState);

  return (
    <Wrapper>
      {productList.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);

  width: 100%;
  grid-gap: 60px 20px;

  @media (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default ItemList;
