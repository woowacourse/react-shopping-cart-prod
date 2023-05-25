import { useEffect, useState } from 'react';

import { GlobalStyle } from '../GlobalStyle';
import { Counter } from '../layout/counter/Counter';
import { Meta } from '@storybook/react';

const meta = {
  title: 'Counter',
  component: Counter,
  decorators: [
    (Story) => (
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
} as Meta;

export default meta;

export const CounterComponent = () => {
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    if (count === undefined) return;
    if (count <= 0) setCount(1);
  }, [count]);

  return <Counter quantity={count} onQuantityChange={setCount} />;
};
