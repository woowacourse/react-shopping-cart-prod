import { Meta } from '@storybook/react';
import HeaderComponent from '../../../components/common/Header';

const meta = {
  component: HeaderComponent,
  title: 'Components/Header',
  tags: ['autodocs'],
  args: {
    title: 'STORE',
  },
  argTypes: {
    title: {
      description: '타이틀을 변경할 수  있습니다.',
    },
  },
} satisfies Meta<typeof HeaderComponent>;

export default meta;

interface Props {
  title: string;
}

export const Header = (args: Props) => {
  return <HeaderComponent title={args.title} />;
};
