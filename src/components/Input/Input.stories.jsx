import Input from './Input';

export default {
  title: 'Component/Input',
  component: Input,
};

function Template(args) {
  return (
    <div style={{ position: 'relative', width: '700px' }}>
      <Input {...args} />
    </div>
  );
}

export const Default = Template.bind({});
Default.args = {
  placeholder: '비밀번호를 입력해주세요.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: '비밀번호를 입력해주세요.',
  disabled: true,
};
