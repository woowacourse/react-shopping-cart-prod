import Fieldset from 'components/Common/Fieldset/Fieldset';
import Input from 'components/Common/Input/Input';

export default {
  title: 'components/Fieldset',
  component: Fieldset,
};

const Template = (args) => <Fieldset {...args} />;

export const Example = Template.bind({});

Example.args = {
  children: <Input />,
};
