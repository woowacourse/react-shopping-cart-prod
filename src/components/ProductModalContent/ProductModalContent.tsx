import {useRecoilValue, useSetRecoilState} from "recoil";
import {ProductItem} from "../../types/types.ts";
import CartController from "../CartController/index.tsx";
import {modalOpenState} from "../../app/recoil/modal/modalAtoms.tsx";
import cartIcon from "../../assets/cart.svg";
import {
  ModalCloseButton,
  ModalHeader,
  ModalTitle,
  ProductDetails,
  ProductItemImage,
  ProductItemImageBox,
  ProductModalContentWrapper,
  ProductName,
  ProductPrice,
} from "./ProductModalContent.style.ts";
import {useNavigate} from "react-router-dom";
import {quantityByProductIdSelector} from "../../app/recoil/cart/cartSelectors.ts";

function ProductModalContent({product}: { product: ProductItem }) {
  const {name, price, imageUrl} = product;
  const navigate = useNavigate();
  const setModalOpen = useSetRecoilState(modalOpenState);

  const quantity = useRecoilValue(quantityByProductIdSelector(product.id));

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ModalHeader>
        <ModalTitle>상품 정보</ModalTitle>
        <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
      </ModalHeader>
      <ProductModalContentWrapper>
        <ProductItemImageBox>
          <ProductItemImage src={imageUrl}/>
        </ProductItemImageBox>
        <ProductDetails>
          <div>
            <ProductName>{name}</ProductName>
            <ProductPrice>{price.toLocaleString()}원</ProductPrice>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            {quantity > 0 && (
              <div style={{cursor: 'pointer'}} onClick={() => {
                closeModal();
                navigate('/cart');
              }}>
                <img src={cartIcon}></img>
              </div>
            )}
            <CartController product={product}/>
          </div>
        </ProductDetails>
      </ProductModalContentWrapper>
    </>
  );
}

export default ProductModalContent;
