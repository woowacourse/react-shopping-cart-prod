import LabeledCheckbox from "@components/checkbox/labeled-checkbox/LabeledCheckbox";

export default {
  title: "Checkbox/LabeledCheckbox",
  component: LabeledCheckbox,
  argTypes: {},
};

function Template(args) {
  return <LabeledCheckbox {...args} />;
}

export const Primary = Template.bind({});

Primary.args = {
  id: "input-id",
  label: "라벨입니다",
};

Primary.argTypes = {
  id: { control: { disable: true } },
};
