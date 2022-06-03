import React from "react";
import PageHeader from "components/common/PageHeader";

export default {
  title: "Component/Common/PageHeader",
  component: PageHeader,
  argTypes: {
    children: { controls: "text" },
  },
};

const Template = (args) => <PageHeader {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "태디",
};
