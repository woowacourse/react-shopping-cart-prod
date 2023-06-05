import { Meta, StoryObj } from '@storybook/react';
import CheckOutProductSection from './CheckOutProductSection';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 80px;
`;

const meta = {
  component: CheckOutProductSection,
  title: 'checkout-page/CheckOutProductSection',
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof CheckOutProductSection>;

export default meta;
type Story = StoryObj<typeof CheckOutProductSection>;

export const Default: Story = {
  render: () => <CheckOutProductSection />,
};
