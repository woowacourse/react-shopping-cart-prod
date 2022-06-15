import HighlightedText from "../src/components/HighlightedText";

export default {
  title: "Highlighter/default",
  component: HighlightedText,
  argTypes: {},
};

function Template(args) {
  return <HighlightedText {...args}>Hello</HighlightedText>;
}

export const Primary = Template.bind({});
