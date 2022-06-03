import Avatar from './Avatar';

export default {
  title: 'Component/Avatar',
  component: Avatar,
};

function Template(args) {
  return <Avatar {...args} />;
}

export const Default = Template.bind({});
