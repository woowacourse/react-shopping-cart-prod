import React from 'react';

import DetailItem from 'component/DetailItem';
import {MOCK_PRODUCT_LIST} from 'mocks/mockData';

import {BrowserRouter} from 'react-router-dom';

export default {
  component: DetailItem,
  title: 'DetailItem',
};

const Template = (args) => (
  <BrowserRouter>
    <DetailItem {...args} />{' '}
  </BrowserRouter>
);
export const Defaults = Template.bind({});
Defaults.args = {
  productInfo: {
    imageUrl: MOCK_PRODUCT_LIST[0].imageUrl,
    name: MOCK_PRODUCT_LIST[0].name,
    price: MOCK_PRODUCT_LIST[0].price,
  },
};
