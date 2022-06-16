import Button from "@/components/Button";

export default {
  component: Button,
  title: "Button",
};

function Template(args) {
  return <Button {...args} />;
}

export const Defaults = Template.bind({});
Defaults.args = {
  width: "200px",
  height: "50px",
  backgroundColor: "red",
  borderRadius: "4px",
  text: "로그인",
};
