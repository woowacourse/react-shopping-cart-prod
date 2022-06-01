import CheckBox from 'components/@common/CheckBox';
import { useState } from 'react';

export default {
  title: 'Common/CheckBox',
  component: CheckBox,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = () => {
  const [checkState, setCheckState] = useState(false);

  return <CheckBox checkState={checkState} handleChecked={() => setCheckState(!checkState)} />;
};

export const DefaultTemplate = Template.bind({});
