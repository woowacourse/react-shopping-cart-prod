import Logo from 'components/Logo/Logo';

export default {
  title: 'Component/Logo',
  component: Logo,
};

function Template(args) {
  return <Logo {...args} />;
}

export const Default = Template.bind({});
