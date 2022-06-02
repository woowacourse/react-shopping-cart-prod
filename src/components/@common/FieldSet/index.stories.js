import InputField from '../InputField';
import FieldSet from './index';

export default {
  title: 'Component/@Common/FieldSet',
  component: FieldSet,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <FieldSet {...args}>
    <InputField type="text" name="template" />
  </FieldSet>
);

export const DefaultFieldSet = Template.bind({});
DefaultFieldSet.args = { labelText: 'FieldSet 제목', description: '설명' };
