import CheckBox from "../src/components/CheckBox/default/CheckBox";

export default {
  title: "CheckBox/CheckBox",
  component: CheckBox,
  argTypes: {},
};

function Template(args) {
  return <CheckBox {...args} />;
}

export const Primary = Template.bind({});

Primary.args = {
  id: "input-id",
};

Primary.argTypes = {
  id: { control: { disable: true } },
};
