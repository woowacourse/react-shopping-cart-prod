import Spinner from 'components/Spinner';
import * as Styled from 'pages/styles';

export default {
  title: 'Component/Spinner',
  component: Spinner,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1000px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <Spinner {...args} />;

export const DefaultTemplate = Template.bind({});
