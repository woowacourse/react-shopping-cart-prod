import ErrorMessage from 'components/@common/ErrorMessage/index';

export default {
  title: 'Common/ErrorMessage',
  component: ErrorMessage,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <ErrorMessage {...args} />;

export const DefaultTemplate = Template.bind({});
