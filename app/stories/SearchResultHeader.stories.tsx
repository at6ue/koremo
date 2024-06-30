import { Meta, StoryObj } from "@storybook/react";
import SearchResultHeader from "../components/SearchResultHeader";

const meta: Meta<typeof SearchResultHeader> = {
  component: SearchResultHeader,
};

export default meta;
type Story = StoryObj<typeof SearchResultHeader>;

export const Default: Story = {
  args: {
    keyword: "商品名",
  },
};
