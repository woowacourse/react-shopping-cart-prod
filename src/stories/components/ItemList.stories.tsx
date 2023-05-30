import { StoryFn, Meta } from "@storybook/react";
import ItemList from "components/ItemList";

export default {
  title: "ItemList",
  component: ItemList,
  decorators: [(StoryFn) => <div style={{ width: "900px" }}>{StoryFn()}</div>],
} as Meta;

const Template: StoryFn = () => <ItemList />;

export const ListSample = Template.bind({});
