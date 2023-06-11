import { Meta } from '@storybook/react';
import MainPage from '../../pages/MainPage';
import { Header } from '../components/common/Header.stories';

const meta = {
  component: MainPage,
  title: 'Pages/MainPage',
  decorators: [
    (Story) => (
      <>
        <Header title='STORE' />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof MainPage>;

export default meta;

export const Main = () => <MainPage />;
