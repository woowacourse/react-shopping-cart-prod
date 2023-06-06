import styled from "styled-components";
import QuantityCounter from "components/QuantityCounter";
import { Product } from "types/domain";
import { addCartItem } from "api/cartItems";
import { cartSelector } from "recoil/cart";
import { useRecoilState, useRecoilValue } from "recoil";
import { serverSelectState } from "recoil/server";

const Item = (item: Product) => {
  const selectedServer = useRecoilValue(serverSelectState);
  const [cartItem, setCartItem] = useRecoilState(cartSelector(item.id));

  const handleCartClicked = async () => {
    if (cartItem?.quantity && cartItem?.quantity >= 1) return;

    const cartItemId = await addCartItem(selectedServer, item.id);

    if (cartItemId) {
      setCartItem({
        id: Number(cartItemId),
        quantity: 1,
        isChecked: true,
        product: item,
      });
    }
  };

  return (
    <Wrapper>
      <ImageBox onClick={handleCartClicked}>
        <img src={item.imageUrl} alt={`${item.name} 상품 이미지`} />
      </ImageBox>
      <NameBox>{item.name}</NameBox>
      <PriceBox>{item.price.toLocaleString()}원</PriceBox>
      <IconContainer>
        {!cartItem ? (
          <img
            src={process.env.PUBLIC_URL + "/assets/cart-gray-icon.svg"}
            alt={"카트"}
            onClick={handleCartClicked}
          />
        ) : (
          <QuantityCounter itemId={item.id} />
        )}
      </IconContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

  & > img {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    background-color: var(--skeleton-color);
  }

  &:hover {
    background-color: var(--image-hover-color);
    box-shadow: 0 10px 10px -3px var(--image-hover-color);
    transition: all 0.3s ease;
  }
`;

const NameBox = styled.div`
  grid-area: name;

  margin: 5px 0 10px 10px;

  font-size: 16px;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

const PriceBox = styled.p`
  grid-area: price;

  margin-left: 10px;

  font-size: 20px;

  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

const IconContainer = styled.div`
  grid-area: quantity;

  cursor: pointer;

  & > img {
    position: absolute;
    right: 10px;
    bottom: 20px;

    width: 24px;
    height: 24px;

    transition: all 0.4s ease-out;

    &:hover {
      transform: scale(1.12);
      opacity: 60%;
    }
  }

  @media (max-width: 1199px) {
    bottom: -5px;
  }
`;

export default Item;
