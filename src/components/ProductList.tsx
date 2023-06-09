import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { localProductsState, loginState } from "../recoil/atom";
import type { LocalProductType } from "../types/domain";
import { CartGrayIcon } from "../assets";
import { Counter } from "./Counter";
import { MIN_QUANTITY } from "../constants";
import { api } from "../api";
import { useToast } from "../hooks/useToast";
import { useLocalProducts } from "../hooks/useLocalProducts";

export const ProductList = () => {
  const { showToast } = useToast();
  const { updateLocalProducts } = useLocalProducts();
  const isLogined = useRecoilValue(loginState);
  const localProducts = useRecoilValue(localProductsState);

  const handleCartClicked = (productId: number) => async () => {
    if (!isLogined) {
      showToast("error", "로그인이 필요한 서비스입니다. 😊");
      return;
    }
    try {
      await api.post("/cart-items", { productId: productId });
      updateLocalProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      {localProducts.map((product: LocalProductType) => (
        <Product
          key={product.id}
          {...product}
          handleCartClicked={handleCartClicked(product.id)}
        />
      ))}
    </Wrapper>
  );
};

interface ProductType extends LocalProductType {
  handleCartClicked: () => void;
}

const Product = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
  handleCartClicked,
}: ProductType) => {
  return (
    <ProductWrapper>
      <img src={imageUrl} alt="상품이미지" />
      <NameBox>{name}</NameBox>
      <PriceBox>{price.toLocaleString()}원</PriceBox>
      <IconContainer>
        {quantity === MIN_QUANTITY ? (
          <img src={CartGrayIcon} alt={"카트"} onClick={handleCartClicked} />
        ) : (
          <Counter productId={id} deleteable />
        )}
      </IconContainer>
    </ProductWrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);

  width: 100%;
  grid-gap: 60px 20px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  & > img {
    width: 300px;
    height: 300px;
    border-radius: 5px;
    object-fit: cover;
    @media screen and (max-width: 1200px) {
      width: 250px;
      height: 250px;
    }

    @media screen and (max-width: 800px) {
      width: 200px;
      height: 200px;
    }

    &:hover {
      background-color: var(--shadow-gray);
      box-shadow: 0 10px 10px -3px var(--shadow-gray);
      transition: all 0.3s ease;
    }
  }
`;

const NameBox = styled.div`
  width: 190px;
  margin: 15px 0 10px 10px;

  font-size: 16px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    font-size: 13px;
  }
`;

const PriceBox = styled.p`
  margin-left: 10px;

  font-size: 20px;

  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 10px;
  bottom: 20px;

  cursor: pointer;

  & > img {
    width: 24px;
    height: 24px;

    transition: all 0.4s ease-out;

    &:hover {
      transform: scale(1.12);
      opacity: 60%;
    }
  }

  @media screen and (max-width: 1200px) {
    bottom: -5px;
  }
`;
