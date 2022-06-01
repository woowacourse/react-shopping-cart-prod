import { ComponentMeta, ComponentStory } from '@storybook/react';
import Avatar from 'components/common/Avatar';

export default {
  component: Avatar,
  title: 'Avatar',
  decorators: [
    Story => (
      <div style={{ width: '100%', height: '100vh', backgroundColor: 'black' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Avatar>;

const Template = args => <Avatar {...args} />;

export const Default: ComponentStory<typeof Avatar> = Template.bind({});
Default.args = {
  name: '시지프',
};
