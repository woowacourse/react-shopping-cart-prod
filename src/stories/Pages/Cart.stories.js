import Cart from 'pages/Cart';

export default {
  title: 'Pages/Cart',
  component: Cart,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1000px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <Cart {...args} />;

export const DefaultTemplate = Template.bind({});
