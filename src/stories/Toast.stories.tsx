import { Meta, StoryObj } from '@storybook/react';

import Toast from '../components/Common/Toast';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../states/toast';
import { useEffect } from 'react';

const meta = {
  title: 'Common/Toast',
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = () => {
  const setToastInfo = useSetRecoilState(toastState);

  useEffect(() => {
    setToastInfo({
      duration: 50000,
      message: 'Toast Message',
      variant: 'success',
    });
  }, [setToastInfo]);

  return <Toast />;
};

export const Error: Story = () => {
  const setToastInfo = useSetRecoilState(toastState);

  useEffect(() => {
    setToastInfo({
      duration: 50000,
      message: 'Toast Message',
      variant: 'error',
    });
  }, [setToastInfo]);

  return <Toast />;
};

Success.args = {};
Error.args = {};
