import IconButton from 'components/@common/IconButton';
import { 아이콘_코드 } from 'constants/';

export default {
  title: 'Common/IconButton',
  component: IconButton,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <IconButton {...args} />;

export const DefaultTemplate = Template.bind({});

DefaultTemplate.args = {
  icon: 아이콘_코드.CARROT,
};
