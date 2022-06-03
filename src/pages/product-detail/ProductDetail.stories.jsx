import ProductDetail from "@/pages/product-detail/ProductDetail";

export default {
  component: ProductDetail,
  title: "ProductDetail",
};

const Template = (args) => <ProductDetail {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "메디프랜 천연치약 블랙치약",
  price: 11000,
  imgUrl:
    "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164334620497560969.jpg?gif=1&w=512&h=512&c=c",
};
