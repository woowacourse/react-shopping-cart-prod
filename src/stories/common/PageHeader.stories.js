import PageHeader from 'components/@common/PageHeader';
import { COLORS } from 'styles/theme';

export default {
  title: 'Common/PageHeader',
  component: PageHeader,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <PageHeader {...args} />;

export const DefaultTemplate = Template.bind({});

DefaultTemplate.args = {
  children: '페이지 제목',
  color: COLORS.BLACK,
};
