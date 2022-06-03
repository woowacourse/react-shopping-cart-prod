import Identification from 'pages/Identification';

export default {
  title: 'Pages/Identification',
  component: Identification,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1000px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <Identification {...args} />;

export const DefaultTemplate = Template.bind({});
