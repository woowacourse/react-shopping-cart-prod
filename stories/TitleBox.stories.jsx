import TitleBox from "../src/components/title-box/TitleBox";
import TitleBoxContent from "../src/components/title-box/TitleBoxContent";
import TitleBoxHead from "../src/components/title-box/TitleBoxHead";

export default {
  title: "TitleBox/TitleBox",
  component: TitleBox,
  argTypes: {},
};

function Template(args) {
  return (
    <TitleBox {...args}>
      <TitleBoxHead>Box Title</TitleBoxHead>
      <TitleBoxContent>This Is Content</TitleBoxContent>
    </TitleBox>
  );
}

export const Primary = Template.bind({});
