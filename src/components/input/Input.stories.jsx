import Input from "@/components/input/Input";

export default {
  component: Input,
  title: "Input",
};

const Template = (args) => <Input {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
  type: "text",
  placeholder: "text 기본 텍스트 입력창",
  minLength: 1,
  maxLength: 6,
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  type: "password",
  placeholder: "password 기본 텍스트 입력창",
  minLength: 1,
  maxLength: 6,
};
