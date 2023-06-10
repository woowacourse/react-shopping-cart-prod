import { StoryFn, Meta } from "@storybook/react";
import ItemList from "components/main/ItemList";

export default {
  title: "ItemList",
  component: ItemList,
} as Meta;

const Template: StoryFn = () => <ItemList />;

export const ListSample = Template.bind({});
