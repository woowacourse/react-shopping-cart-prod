import Title from '.';

export default {
  title: 'Components/Title',
  component: Title,
};

const Template = args => <Title {...args} />;

export const TitleTemplate = Template.bind({});
TitleTemplate.args = {
  mainTitle: '로그인',
  subTitle: '환영합니다 👋',
};
