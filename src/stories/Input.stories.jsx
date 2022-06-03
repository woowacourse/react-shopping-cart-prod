import React from 'react';

import Input from 'components/Input';

export default {
  title: 'Shared/Input',
  component: Input,
};

const Template = (args) => (
  <div style={{ width: '450px' }}>
    <Input {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  label: '이름',
  type: 'text',
  value: 'text',
  placeholder: '아놀드 사랑해',
  onChange: () => {},
  isError: true,
};
