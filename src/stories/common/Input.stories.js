import Input from 'components/@common/Input/styles';
import { COLORS } from 'styles/theme';

export default {
  title: 'Common/Input',
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <Input {...args} />;

export const DefaultTemplate = Template.bind({});

DefaultTemplate.args = {
  type: 'text',
  width: '100%',
  height: '60px',
  border: `1px solid ${COLORS.GRAY_300}`,
  margin: '1rem 0',
  padding: '15px;',
  size: '1.16rem',
  focusBorderColor: COLORS.MINT_200,
};
