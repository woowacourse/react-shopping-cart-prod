import EditUserPassword from 'pages/EditUserPassword';

export default {
  title: 'Pages/EditUserPassword',
  component: EditUserPassword,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1000px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <EditUserPassword {...args} />;

export const DefaultTemplate = Template.bind({});
