import Input from "./Input";

export default {
  title: "Input/Single",
  component: Input,
  argTypes: {},
};

function Template(args) {
  return <Input {...args} />;
}

export const Primary = Template.bind({});
