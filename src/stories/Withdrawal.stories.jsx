import React from 'react';

import Withdrawal from 'components/Withdrawal';

export default {
  title: 'Template/Withdrawal',
  component: Withdrawal,
};

const Template = (args) => <Withdrawal {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
