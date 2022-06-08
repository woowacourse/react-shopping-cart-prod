import { useNavigate } from "react-router-dom";

import { theme } from "style";

import { ROUTES, BASE_SERVER_URL, SERVER_PATH, USER_ID_KEY } from "constants";
import { postBaseServerCartItem } from "util/fetch";

import DefaultButton from "components/common/Button/DefaultButton";
import {
  Bottom,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductPriceTitle,
  Top,
} from "./styled";
import { useSelector } from "react-redux";

function ProductDetail({
  selectedProduct: { productId, thumbnailUrl, name, price },
}) {
  const serverUrlIndex = useSelector((state) => state.server.serverUrlIndex);
  const isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();

  const handleClickCartButton = async () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      navigate(ROUTES.LOGIN);
      return;
    }

    try {
      const response = await postBaseServerCartItem({
        url: `${BASE_SERVER_URL(serverUrlIndex)}${
          SERVER_PATH.CUSTOMER_LIST
        }/${localStorage.getItem(USER_ID_KEY)}/carts`,
        body: JSON.stringify({ productId, count: 1 }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        throw new Error(`문제가 발생했습니다. 잠시 후에 다시 시도해 주세요 :(`);
      }
    } catch (error) {
      alert(error.message);
      return;
    }
    alert("장바구니에 담았습니다.");
  };

  return (
    <>
      <Top>
        <ProductImage src={thumbnailUrl ?? ""} alt={name} />
        <ProductName>{name ?? "%Error%"}</ProductName>
      </Top>
      <Bottom>
        <ProductPriceTitle>금액</ProductPriceTitle>
        <ProductPrice>{price?.toLocaleString() ?? "%Error%"}원</ProductPrice>
      </Bottom>
      <DefaultButton
        onClick={handleClickCartButton}
        bgColor={theme.color.point}
      >
        장바구니 담기
      </DefaultButton>
    </>
  );
}

export default ProductDetail;
