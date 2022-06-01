import Modal from "components/pages/UserInfoPage/Modal";

export default {
  title: "Component/Modal",
  component: Modal,
  argTypes: {},
};

const Template = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {};
