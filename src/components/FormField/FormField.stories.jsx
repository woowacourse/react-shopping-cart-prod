import FormField from './FormField';

export default {
  title: 'Component/FormField',
  component: FormField,
};

function Template(args) {
  return <FormField {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  placeholder: '6자리 이상 비밀번호를 입력해주세요.',
};

export const Required = Template.bind({});
Required.args = {
  placeholder: '6자리 이상 비밀번호를 입력해주세요.',
  required: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: '6자리 이상 비밀번호를 입력해주세요.',
  disabled: true,
};
