import TermsPage from './TermsPage';

export default {
  title: 'Page/TermsPage',
  component: TermsPage,
};

function Template(args) {
  return <TermsPage {...args} />;
}

export const Default = Template.bind({});
