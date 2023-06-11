import { Meta } from '@storybook/react';
import ServerSelectorComponent from '../../../components/ServerSelector';

const meta = {
  component: ServerSelectorComponent,
  title: 'Components/ServerSelector',
} satisfies Meta<typeof ServerSelectorComponent>;

export default meta;

export const ServerSelector = () => <ServerSelectorComponent />;
