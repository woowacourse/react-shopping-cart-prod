import type {ProductItem} from "../../types/types";
import {
  CartCount,
  CartCountWrapper,
  ProductDetails,
  ProductInfo,
  ProductItemBox,
  ProductItemImage,
  ProductItemImageBox,
  ProductName,
  ProductPrice,
} from "./ProductItem.style";
import {useRecoilValue} from "recoil";
import ProductModalContent from "../ProductModalContent/ProductModalContent.tsx";
import cartIcon from "../../assets/cart.svg";
import {quantityByProductIdSelector} from "../../app/recoil/cart/cartSelectors.ts";
import {modalRepository} from "../../app/recoil/modal/modalRepository.tsx";

interface ProductItemProps {
  product: ProductItem;
}

function ProductItem({product}: ProductItemProps) {
  const {name, price, imageUrl} = product;
  const quantity = useRecoilValue(quantityByProductIdSelector(product.id));
  const {openModal} = useRecoilValue(modalRepository);

  return (
    <>
      <ProductItemBox
        onClick={() => openModal(<ProductModalContent product={product}/>)}
      >
        <ProductItemImageBox>
          <ProductItemImage src={imageUrl} loading="lazy"/>
        </ProductItemImageBox>
        <ProductDetails>
          <ProductInfo>
            <ProductName>{name}</ProductName>
            <ProductPrice>{price.toLocaleString()}원</ProductPrice>
          </ProductInfo>
          {quantity > 0 ? (
            <CartCountWrapper>
              <CartCount>{quantity}</CartCount>
            </CartCountWrapper>
          ) : (
            <img src={cartIcon}></img>
          )}
        </ProductDetails>
      </ProductItemBox>
    </>
  );
}

export default ProductItem;
