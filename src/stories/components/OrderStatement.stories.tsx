import { StoryFn, Meta } from "@storybook/react";
import OrderStatement from "components/OrderStatement";

export default {
  title: "OrderItemList",
  component: OrderStatement,
  decorators: [(StoryFn) => <div style={{ width: "500px" }}>{StoryFn()}</div>],
} as Meta;

const Template: StoryFn = () => {
  const items = {
    orderItemId: 1,
    total: 4000,
    quantity: 1,
    coupons: [],
    product: {
      id: 1,
      name: "친환경미니탕용기 158 중 (EL)",
      price: 65500,
      imageUrl:
        "https://cdn-mart.baemin.com/goods/46/D139-RM-60367_%EC%86%8C%EB%9F%89_%EB%AF%B8%EB%8B%88%ED%83%95%EC%9A%A9%EA%B8%B0_EL_158_%EC%A4%91_%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg?h=700&w=700",
    },
  };

  return <OrderStatement orderId={1} orders={[items]} />;
};
export const DefaultOrderItemList = Template.bind({});
