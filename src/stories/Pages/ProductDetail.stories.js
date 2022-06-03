import ProductDetail from 'pages/ProductDetail';

export default {
  title: 'Pages/ProductDetail',
  component: ProductDetail,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1000px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <ProductDetail />;

export const DefaultTemplate = Template.bind({});
