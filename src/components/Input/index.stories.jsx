import Input from '.';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as NicknameIcon } from 'assets/nickname_icon.svg';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';

export default {
  title: 'Components/Input',
  component: Input,
};

const Template = args => <Input {...args} />;

export const EmailTemplate = Template.bind({});
EmailTemplate.args = {
  label: 'Email Address',
  icon: <EmailIcon />,
};

export const NicknameTemplate = Template.bind({});
NicknameTemplate.args = {
  label: 'Nickname',
  icon: <NicknameIcon />,
};

export const PasswordTemplate = Template.bind({});
PasswordTemplate.args = {
  label: 'Password',
  icon: <PasswordIcon />,
};
