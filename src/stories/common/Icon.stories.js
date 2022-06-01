import Icon from 'components/@common/Icon/styles';
import { 아이콘_코드 } from 'constants/';
import { COLORS } from 'styles/theme';

export default {
  title: 'Common/Icon',
  component: Icon,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <Icon {...args} />;

export const Carrot = Template.bind({});
export const Cart = Template.bind({});
export const Receipt = Template.bind({});
export const Delete = Template.bind({});
export const User = Template.bind({});
export const Alert = Template.bind({});

Carrot.args = {
  color: COLORS.BLACK,
  icon: 아이콘_코드.CARROT,
};

Cart.args = {
  color: COLORS.BLACK,
  icon: 아이콘_코드.CART,
};

Receipt.args = {
  color: COLORS.BLACK,
  icon: 아이콘_코드.RECEIPT,
};

Delete.args = {
  color: COLORS.BLACK,
  icon: 아이콘_코드.DELETE,
};

User.args = {
  color: COLORS.BLACK,
  icon: 아이콘_코드.USER,
};

Alert.args = {
  color: COLORS.BLACK,
  icon: 아이콘_코드.ALERT,
};
