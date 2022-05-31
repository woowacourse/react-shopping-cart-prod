import React from "react";
import UserInput from "components/common/UserInput";

export default {
  title: "Component/Common/UserInput",
  component: UserInput,
  argTypes: {
    type: { cotrols: "text" },
    placeholder: { cotrols: "text" },
    errorMessage: { cotrols: "text" },
    width: { cotrols: "text" },
  },
};

const Template = (args) => <UserInput {...args} />;

export const Default = Template.bind({});

Default.args = {
  type: "text",
  placeholder: "비밀번호를 입력해주세요.",
  errorMessage: "이 부분은 에러 메세지가 보입니다.",
  width: "500px",
};
