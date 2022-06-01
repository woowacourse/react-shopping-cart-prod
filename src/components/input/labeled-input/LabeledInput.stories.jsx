import LabeledInput from "./LabeledInput";

export default {
  title: "Input/LabeledInput",
  component: LabeledInput,
  argTypes: {},
};

function Template(args) {
  return <LabeledInput {...args} />;
}

export const Primary = Template.bind({});
Primary.args = {
  label: "This is Label",
};
