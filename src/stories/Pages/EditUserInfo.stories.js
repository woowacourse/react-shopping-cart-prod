import EditUserInfo from 'pages/EditUserInfo';

export default {
  title: 'Pages/EditUserInfo',
  component: EditUserInfo,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1000px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <EditUserInfo {...args} />;

export const DefaultTemplate = Template.bind({});
