import Header from "components/Header";
import OrderStatement from "components/OrderStatement";
import LoadingSpinner from "components/common/LodingSpinner";
import Page from "components/common/Page";
import Skeleton from "components/common/Skeleton";
import { Suspense, useEffect } from "react";

const item = {
  quantity: 1,
  couponId: [1],
  product: {
    id: 1,
    name: "친환경미니탕용기 158 중 (EL)",
    price: 65500,
    imageUrl:
      "https://cdn-mart.baemin.com/goods/46/D139-RM-60367_%EC%86%8C%EB%9F%89_%EB%AF%B8%EB%8B%88%ED%83%95%EC%9A%A9%EA%B8%B0_EL_158_%EC%A4%91_%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg?h=700&w=700",
  },
};

const OrderStatementList = () => {
  useEffect(() => {});

  return (
    <>
      <Suspense
        fallback={
          <Skeleton
            {...{ background: "#333333", width: "100%", height: "70px" }}
          />
        }
      >
        <Header />
      </Suspense>
      <Page pageName="주문내역">
        <Suspense fallback={<LoadingSpinner />}>
          <OrderStatement
            orders={[item, item, item, item, item, item, item]}
          ></OrderStatement>
        </Suspense>
      </Page>
    </>
  );
};

export default OrderStatementList;
