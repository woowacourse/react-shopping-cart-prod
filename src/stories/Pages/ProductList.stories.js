import ProductList from 'pages/ProductList';

export default {
  title: 'Pages/ProductList',
  component: ProductList,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1000px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <ProductList {...args} />;

export const DefaultTemplate = Template.bind({});
