import Spinner from 'components/Spinner/Spinner';

export default {
  title: 'Component/Spinner',
  component: Spinner,
};

function Template(args) {
  return <Spinner {...args} />;
}

export const Default = Template.bind({});
