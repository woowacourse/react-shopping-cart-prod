import type { StoryFn } from '@storybook/react';

import ProductItem from './ProductItem';

export default {
  title: 'ProductItem',
  component: ProductItem,
};

const Template: StoryFn<React.ComponentProps<typeof ProductItem>> = (props) => (
  <ProductItem {...props} />
);

export const Controls = Template.bind({});
Controls.args = {
  id: 96,
  name: 'SONY 컨트롤러',
  price: 104000,
  imageUrl: 'https://picsum.photos/id/96/300',
};
