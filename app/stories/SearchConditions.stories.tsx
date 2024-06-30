import { Meta, StoryObj } from "@storybook/react";
import SearchConditions from "../components/SearchConditions";

const meta: Meta<typeof SearchConditions> = {
  component: SearchConditions,
};

export default meta;
type Story = StoryObj<typeof SearchConditions>;

export const Default: Story = {
  args: { sort: "standard" },
};
