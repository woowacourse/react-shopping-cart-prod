import Field from "@/components/Field";

export default {
  component: Field,
  title: "Field",
};

const Template = (args) => <Field {...args} />;

export const Default = Template.bind({});
Default.args = {
  labelName: "로그인",
};

export const ErrorField = Template.bind({});
ErrorField.args = {
  labelName: "로그인",
  errorMessage: "올바르지 않은 값입니다",
};
