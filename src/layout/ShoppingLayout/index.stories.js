import ShoppingLayout from '.';

export default {
  title: 'Component/Layout/Default Layout',
  component: ShoppingLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <ShoppingLayout {...args}>컨텐츠가 들어갈 영역</ShoppingLayout>;

export const DefaultTemplate = Template.bind({});
DefaultTemplate.parameters = {
  controls: { hideNoControlsWarning: true },
};
