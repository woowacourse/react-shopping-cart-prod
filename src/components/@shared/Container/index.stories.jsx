import Container from '.';

export default {
  title: 'Components/Container',
  component: Container,
};

const Template = args => <Container {...args} />;

export const LoginTemplate = Template.bind({});
LoginTemplate.args = {
  children: <div>👋</div>,
  width: '505px',
  height: '507px',
};
