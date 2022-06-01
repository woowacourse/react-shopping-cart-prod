import SignupResultPage from './SignupResultPage';

export default {
  title: 'Page/SignupResultPage',
  component: SignupResultPage,
};

function Template(args) {
  return <SignupResultPage {...args} />;
}

export const Default = Template.bind({});
