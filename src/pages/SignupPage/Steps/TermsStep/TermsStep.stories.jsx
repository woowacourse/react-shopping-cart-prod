import TermsStep from 'pages/SignupPage//Steps/TermsStep/TermsStep';

export default {
  title: 'Signup Step/TermsStep',
  component: TermsStep,
};

function Template(args) {
  return <TermsStep {...args} />;
}

export const Default = Template.bind({});
