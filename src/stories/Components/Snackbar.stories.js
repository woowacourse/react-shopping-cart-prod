import { Provider } from 'react-redux';

import Snackbar from 'components/Snackbar';
import snackbarStore from 'stories/config/snackbarStore';

export default {
  title: 'Component/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Provider store={snackbarStore}>
        <div style={{ maxWidth: '500px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
};

const Template = (args) => <Snackbar {...args} />;

export const DefaultTemplate = Template.bind({});
