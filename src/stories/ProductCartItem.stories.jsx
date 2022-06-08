import React, { useState } from "react";
import ProductCartItem from "components/pages/ProductCartPage/ProductCartItem";

export default {
  title: "Component/ProductCartItem",
  component: ProductCartItem,
  argTypes: {
    product: { controls: "object" },
  },
};

const Template = (args) => {
  const [checkList, setCheckList] = useState([]);
  const handleClickIncreaseButton = (productId) => () => {};

  const handleClickDecreaseButton = (productId, count) => () => {};

  const handleClickDeleteItemButton = (productId) => () => {};

  const handleChangeCheckbox = (productId) => () => {
    if (checkList.includes(productId)) {
      setCheckList((prev) =>
        prev.filter((cartItemId) => cartItemId !== productId)
      );
      return;
    }
    setCheckList((prev) => [...prev, productId]);
  };

  return (
    <ProductCartItem
      {...args}
      checkList={checkList}
      handleClickIncreaseButton={handleClickIncreaseButton}
      handleClickDecreaseButton={handleClickDecreaseButton}
      handleClickDeleteItemButton={handleClickDeleteItemButton}
      handleChangeCheckbox={handleChangeCheckbox}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  product: {
    productId: 1,
    thumbnailUrl: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
    name: "PET보틀-정사각(420ml)",
    price: 43400,
    count: 1,
  },
};
