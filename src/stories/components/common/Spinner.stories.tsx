import { Meta } from '@storybook/react';
import SpinnerComponent from '../../../components/common/Spinner';

const meta = {
  component: SpinnerComponent,
  title: 'Components/Spinner',
} satisfies Meta<typeof SpinnerComponent>;

export default meta;

export const Spinner = () => <SpinnerComponent />;
