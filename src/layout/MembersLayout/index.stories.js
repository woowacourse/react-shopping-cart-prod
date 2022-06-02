import MembersLayout from '.';

export default {
  title: 'Component/Layout/Default Layout',
  component: MembersLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <MembersLayout {...args}>컨텐츠가 들어갈 영역</MembersLayout>;

export const DefaultTemplate = Template.bind({});
DefaultTemplate.parameters = {
  controls: { hideNoControlsWarning: true },
};
