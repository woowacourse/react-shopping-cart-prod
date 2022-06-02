import InputField from './index';

export default {
  title: 'Component/@Common/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <InputField {...args} />;

export const DefaultInput = Template.bind({});
DefaultInput.args = {};

export const ErrorMessage = Template.bind({});
ErrorMessage.args = { status: 'danger', message: '오류 메시지입니다.' };
