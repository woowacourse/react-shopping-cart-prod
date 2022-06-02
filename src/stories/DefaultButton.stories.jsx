import React from "react";
import DefaultButton from "components/common/Button/DefaultButton";

export default {
  title: "Component/Common/DefaultButton",
  component: DefaultButton,
  argTypes: {
    children: { controls: "text" },
  },
};

const Template = (args) => <DefaultButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "Sample",
};

export const FilledButton = Template.bind({});

FilledButton.args = {
  children: "Sample",
  width: "500px",
  bgColor: "#E7A0A0",
  textColor: "#fff",
};

export const EmptyButton = Template.bind({});

EmptyButton.args = {
  children: "Sample",
  width: "500px",
  bgColor: "#fff",
  textColor: "#E7A0A0",
};
