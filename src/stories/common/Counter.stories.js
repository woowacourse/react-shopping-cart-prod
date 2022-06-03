import Counter from 'components/@common/Counter';
import { useState } from 'react';

export default {
  title: 'Common/Counter',
  component: Counter,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = () => {
  const [count, setCount] = useState(1);

  return <Counter count={count} handleItemCount={(_, number) => setCount(number)} />;
};

export const DefaultTemplate = Template.bind({});
