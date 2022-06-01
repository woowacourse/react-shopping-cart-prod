import Button from 'components/@common/Button/styles';
import { COLORS } from 'styles/theme';

export default {
  title: 'Common/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <Button {...args}>기본 테마 버튼</Button>;

export const DefaultTemplate = Template.bind({});

DefaultTemplate.args = {
  cursor: 'pointer',
  width: '100%',
  height: '60px',
  margin: '2rem 0',
  backgroundColor: COLORS.BROWN_200,
  color: COLORS.WHITE,
  weight: 'bold',
  size: '1.16rem',
  border: 'none',
};
