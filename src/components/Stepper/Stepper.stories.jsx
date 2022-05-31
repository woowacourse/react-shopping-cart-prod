import SignupStage from './SignupStage';

export default {
  title: 'Component/SignupStage',
  component: SignupStage,
};

function Template(args) {
  return <SignupStage {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  stageList: [
    {
      urlParamId: '/signup/agree-to-term',
      title: '약관동의',
    },
    {
      urlParamId: '/signup/fill-info',
      title: '정보입력',
    },
    {
      urlParamId: '/signup/completion',
      title: '가입완료',
    },
  ],
};
