import Login from 'pages/Login';

export default {
  title: 'pages/Login',
  component: Login,
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

const Template = (args) => <Login {...args} />;

export const DefaultTemplate = Template.bind({});
