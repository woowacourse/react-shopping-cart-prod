import DeleteAccountModal from "components/pages/UserInfoPage/DeleteAccountModal";

export default {
  title: "Component/Modal",
  component: DeleteAccountModal,
  argTypes: {},
};

const Template = (args) => <DeleteAccountModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
