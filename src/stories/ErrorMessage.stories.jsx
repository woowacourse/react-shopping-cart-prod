import React from 'react';

import ErrorMessage from 'components/ErrorMessage';

export default {
  title: 'Template/ErrorMessage',
  component: ErrorMessage,
};

const Template = (args) => <ErrorMessage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  validation: () => {
    throw new Error('에러메시지');
  },
};
