import { Meta, StoryObj } from "@storybook/react";
import SortConditionDialog from "../components/SortConditionDialog";

const meta: Meta<typeof SortConditionDialog> = {
  component: SortConditionDialog,
};

export default meta;
type Story = StoryObj<typeof SortConditionDialog>;

export const Default: Story = {
  args: { open: true, sort: "standard" },
};
