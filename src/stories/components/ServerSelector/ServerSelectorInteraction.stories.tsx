import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import ServerSelectorComponent from '../../../components/ServerSelector';

const meta = {
  component: ServerSelectorComponent,
  title: 'Components/ServerSelector/Success Interaction',
} satisfies Meta<typeof ServerSelectorComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const pause = () => new Promise((resolve) => setTimeout(resolve, 2000));

export const SuccessInteraction: Story = {
  render: () => <ServerSelectorComponent />,

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await pause();

    await step('Click Server Selector', async () => {
      await waitFor(() => {
        const defaultServerSelector = canvas.getByText('준팍 서버');

        userEvent.click(defaultServerSelector);
      });
    });

    await pause();

    const thirdServer = canvas.getByText('도이');

    await step('Select Server', async () => {
      await waitFor(() => {
        userEvent.click(thirdServer);
      });

      await pause();

      await waitFor(() => {
        userEvent.unhover(thirdServer);

        const selectedServer = canvas.getByText('도이 서버');

        expect(selectedServer).toBeVisible();
      });
    });
  },
};
