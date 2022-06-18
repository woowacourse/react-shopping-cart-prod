import Checkbox from 'components/Checkbox/Checkbox';

export default {
  title: 'Component/Checkbox',
  component: Checkbox,
};

function Template(args) {
  return <Checkbox {...args} />;
}

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
