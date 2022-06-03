import DropDownOption from 'components/Common/DropDownOption/DropDownOption';

export default {
  title: 'components/DropDownOption',
  component: DropDownOption,
};

const Template = (args) => <DropDownOption {...args} />;

export const Example = Template.bind({});

Example.args = {
  children: <div>테스트</div>,
};
