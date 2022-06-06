import Form from "@/components/Form";
import Field from "@/components/Field";

export default {
  component: Form,
  title: "Form",
};

const Template = (args) => (
  <Form {...args}>
    <Field labelName="로그인" />
    <Field labelName="회원가입" />
  </Form>
);

export const Default = Template.bind({});
Default.args = {
  buttonText: "로그인",
};
