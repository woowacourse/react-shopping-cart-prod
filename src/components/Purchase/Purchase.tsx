import { useRecoilValue } from "recoil";
import {
  checkedCartSelector,
  totalPriceSelector,
} from "../../app/recoil/cartAtoms.ts";
import { useNavigate } from "react-router-dom";
import { modalRepository } from "../../app/recoil/modalAtoms.tsx";
import {
  Button,
  ButtonGroup,
  FatBorder,
  ProductItemImage,
  ProductItemInfo,
  ProductItemLayout,
  ProductItemList,
  ProductItemName,
  ProductItemPriceText,
  ProductItemSubTotalPrice,
  PurchaseTitle,
  Option,
  PurchasePropertyWrapper,
  PurchasePrimaryText,
  PurchaseList,
  PurchaseSecondaryText,
  PurchaseResultText,
  Title,
  Box,
} from "./Purchase.style.ts";
import CouponSelector from "../CouponSelector";
import {
  deliveryFeeState,
  orderRepository,
  selectedPointState,
} from "../../app/recoil/orderAtom.ts";
import PointSelector from "../PointSelector/PointSelector.tsx";

function Purchase() {
  const navigate = useNavigate();
  const DELIVERY_FEE = useRecoilValue(deliveryFeeState);
  const checkedCartList = useRecoilValue(checkedCartSelector);
  const totalPrice = useRecoilValue(totalPriceSelector);
  const selectedPoint = useRecoilValue(selectedPointState);
  const { commitPurchaseItems } = useRecoilValue(orderRepository);
  const { closeModal } = useRecoilValue(modalRepository);

  const purchase = () => {
    commitPurchaseItems();
    navigate("/order");
  };

  return (
    <div>
      <div>
        <PurchaseTitle>결제하기</PurchaseTitle>
        <FatBorder />
        <ProductItemList>
          {checkedCartList.map((cartItem, i) => (
            <ProductItemLayout key={i}>
              <ProductItemImage src={cartItem.product.imageUrl} />
              <ProductItemInfo>
                <ProductItemName>{cartItem.product.name}</ProductItemName>
                <ProductItemSubTotalPrice>
                  <ProductItemPriceText>
                    {cartItem.product.price.toLocaleString()}원 (x
                    {cartItem.quantity})
                  </ProductItemPriceText>
                  <ProductItemPriceText>
                    {(
                      cartItem.product.price * cartItem.quantity
                    ).toLocaleString()}
                    원
                  </ProductItemPriceText>
                </ProductItemSubTotalPrice>
              </ProductItemInfo>
            </ProductItemLayout>
          ))}
        </ProductItemList>
      </div>
      <Box>
        <Title>배송지 선택하기</Title>
        <Option>
          <input type="radio" checked onChange={undefined} readOnly /> 집
        </Option>
      </Box>
      <Box>
        <Title>결제수단 선택하기</Title>
        <Option>
          <input type="radio" checked onChange={undefined} readOnly /> 카드
        </Option>
      </Box>

      <CouponSelector />
      <PointSelector />

      <PurchaseList>
        <PurchasePropertyWrapper>
          <PurchasePrimaryText>합계</PurchasePrimaryText>
          <PurchasePrimaryText>
            {totalPrice.toLocaleString()}원
          </PurchasePrimaryText>
        </PurchasePropertyWrapper>
        <PurchasePropertyWrapper>
          <PurchaseSecondaryText>쿠폰</PurchaseSecondaryText>
          <PurchaseSecondaryText>- 0원</PurchaseSecondaryText>
        </PurchasePropertyWrapper>
        <PurchasePropertyWrapper>
          <PurchaseSecondaryText>포인트</PurchaseSecondaryText>
          <PurchaseSecondaryText>
            - {selectedPoint.toLocaleString()}원
          </PurchaseSecondaryText>
        </PurchasePropertyWrapper>
        <PurchasePropertyWrapper>
          <PurchasePrimaryText>배송비</PurchasePrimaryText>
          <PurchasePrimaryText>
            + {DELIVERY_FEE.toLocaleString()}원
          </PurchasePrimaryText>
        </PurchasePropertyWrapper>
        <PurchasePropertyWrapper>
          <PurchaseResultText>최종 결제 금액</PurchaseResultText>
          <PurchaseResultText>
            {(totalPrice - selectedPoint + DELIVERY_FEE).toLocaleString()}원
          </PurchaseResultText>
        </PurchasePropertyWrapper>
      </PurchaseList>

      <ButtonGroup>
        <Button color="red" onClick={() => closeModal()}>
          뒤로가기
        </Button>
        <Button color="green" onClick={() => purchase()}>
          결제하기
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Purchase;
