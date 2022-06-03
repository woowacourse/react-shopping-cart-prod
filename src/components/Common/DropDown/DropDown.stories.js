import DropDown from 'components/Common/DropDown/DropDown';
import DropDownOption from 'components/Common/DropDownOption/DropDownOption';

export default {
  title: 'components/DropDown',
  component: DropDown,
};

const Template = (args) => <DropDown {...args} />;

export const Example = Template.bind({});

Example.args = {
  children: (
    <>
      <DropDownOption>테스트</DropDownOption>
      <DropDownOption>테스트</DropDownOption>
      <DropDownOption hasUnderLine={false}>테스트</DropDownOption>
    </>
  ),
};
