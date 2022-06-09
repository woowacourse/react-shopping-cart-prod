import React from 'react';

import Cart from 'components/Cart';

export default {
  name: 'Template/Cart',
  component: Cart,
};

const Template = (args) => <Cart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: 1,
  imageUrl:
    'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201704/10/8a043cc8-818b-4b85-a962-7914b83777de.jpg',
  name: '사나',
  price: 300000,
  quantity: 1,
  selected: true,
};
