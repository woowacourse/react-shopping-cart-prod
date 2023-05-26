import { Meta } from '@storybook/react';
import SpinnerComponent from '../../../components/common/Spinner';

const meta = {
  component: SpinnerComponent,
  title: 'Components/Spinner',
  tags: ['autodocs'],
} satisfies Meta<typeof SpinnerComponent>;

export default meta;

export const Spinner = () => (
  <div style={{ margin: '80px' }}>
    <SpinnerComponent />
  </div>
);
