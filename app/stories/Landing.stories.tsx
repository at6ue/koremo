import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import Landing from "../components/Landing";

const meta: Meta<typeof Landing> = {
  component: Landing,
};

export default meta;
type Story = StoryObj<typeof Landing>;

export const Default: Story = {
  args: {
    keywords: [],
  },
};

export const 入力欄を追加できる: Story = {
  args: {
    keywords: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = await canvas.getAllByRole("button", {
      name: /追加/i,
    });
    await userEvent.click(addButton[0]);
  },
};
