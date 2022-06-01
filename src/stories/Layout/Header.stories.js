import Header from 'components/Layout/Header';

export default {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Header {...args} />;

export const DefaultTemplate = Template.bind({});
