import SignUp from '../pages/SignUp';

export default {
  title: 'pages/SignUp',
  component: SignUp,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '1000px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <SignUp {...args} />;

export const DefaultTemplate = Template.bind({});
