import Field from "@/components/Field";
import Form from "@/components/Form";

export default {
  component: Form,
  title: "Form",
};

function Template(args) {
  return (
    <Form {...args}>
      <Field labelName="로그인" />
      <Field labelName="회원가입" />
    </Form>
  );
}

export const Default = Template.bind({});
Default.args = {
  buttonText: "로그인",
};
