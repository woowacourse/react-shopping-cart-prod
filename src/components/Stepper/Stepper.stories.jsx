import Stepper from './Stepper';

const stepList = [
  {
    id: '/agree-to-term',
    title: '약관동의',
  },
  {
    id: '/fill-info',
    title: '정보입력',
  },
  {
    id: '/completion',
    title: '가입완료',
  },
];

export default {
  title: 'Component/Stepper',
  component: Stepper,
  argTypes: {
    currentStepId: {
      options: stepList.map((step) => step.id),
      control: { type: 'radio' },
    },
  },
};

function Template(args) {
  return <Stepper {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  stepList,
  currentStepId: stepList[0].id,
};
