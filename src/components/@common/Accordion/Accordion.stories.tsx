import { Meta, StoryObj } from '@storybook/react';
import Accordion from '.';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
`;

const ExampleTrigger = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const ExampleContent = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const meta = {
  component: Accordion.Root,
  title: 'Accordion',
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Accordion.Root>;

export default meta;
type Story = StoryObj<typeof Accordion.Root>;

export const Default_Open: Story = {
  render: () => (
    <Accordion.Root>
      <Accordion.Trigger>
        <ExampleTrigger>👉Trigger!👈</ExampleTrigger>
      </Accordion.Trigger>
      <Accordion.Content>
        <ExampleContent>✨Content!✨</ExampleContent>
      </Accordion.Content>
    </Accordion.Root>
  ),
};

export const Default_Close: Story = {
  render: () => (
    <Accordion.Root defaultOpen={false}>
      <Accordion.Trigger>
        <ExampleTrigger>👉Trigger!👈</ExampleTrigger>
      </Accordion.Trigger>
      <Accordion.Content>
        <ExampleContent>✨Content!✨</ExampleContent>
      </Accordion.Content>
    </Accordion.Root>
  ),
};
