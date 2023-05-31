import { styled } from "styled-components";

const ItemListSkeleton = () => {
  return (
    <Wrapper>
      {new Array(12).fill(0).map((_) => (
        <ItemWrapper>
          <ImageBox>
            <div />
          </ImageBox>
          <NameBox>상품명 스켈레톤</NameBox>
          <PriceBox>상품 가격 스켈레톤</PriceBox>
        </ItemWrapper>
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

const ItemWrapper = styled.div`
  display: grid;
  grid-template-areas:
    "image image"
    "name quantity"
    "price quantity";
  grid-template-columns: auto 74px;

  width: 100%;

  position: relative;
`;

const ImageBox = styled.div`
  grid-area: image;

  width: 100%;
  padding-top: 100%;
  position: relative;

  margin-bottom: 18px;

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const NameBox = styled.div`
  grid-area: name;

  margin: 5px 0 10px 5px;

  height: 18px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.06);
  color: transparent;

  border-radius: 5px;

  @media (max-width: 767px) {
    height: 16px;
  }
`;

const PriceBox = styled.p`
  grid-area: price;

  margin-left: 5px;

  height: 22px;
  color: transparent;
  background-color: rgba(0, 0, 0, 0.03);

  border-radius: 5px;

  @media (max-width: 767px) {
    height: 18px;
  }
`;

export default ItemListSkeleton;
