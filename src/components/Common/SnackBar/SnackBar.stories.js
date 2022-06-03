import SnackBar from 'components/Common/SnackBar/SnackBar';

export default {
  title: 'components/SnackBar',
  component: SnackBar,
};

const Template = (args) => <SnackBar {...args} />;

export const Example = Template.bind({});
