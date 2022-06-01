import Profile from 'components/User/Profile/Profile';

export default {
  title: 'components/Profile',
  component: Profile,
};

const Template = (args) => <Profile {...args} />;

export const Example = Template.bind({});

Example.args = {
  name: '콜라',
};
