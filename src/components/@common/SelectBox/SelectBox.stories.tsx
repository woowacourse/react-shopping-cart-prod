import { Meta, StoryObj } from '@storybook/react';
import SelectBox from './SelectBox';
import BASE_URL from 'constants/apiBaseURL';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 40px;
`;

const meta = {
  component: SelectBox,
  title: 'Common/SelectBox',
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],

  argTypes: {
    value: {
      description: 'SelectBox의 초기값 상태입니다.',
    },

    options: {
      description: 'SelectBox의 하위 option을 정의하는 배열입니다.',
    },

    onChange: {
      description: '옵션 선택 시 실행될 함수입니다.',
    },
  },
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof SelectBox>;

const SelectBoxWithHooks = () => {
  const [value, setValue] = useState('헙크');

  const handleChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const serverOwnerOptions = Object.keys(BASE_URL).map((name) => ({ name: name, value: name }));

  return <SelectBox value={value} options={serverOwnerOptions} onChange={handleChangeValue} />;
};

export const Default: Story = {
  render: () => <SelectBoxWithHooks />,
};
