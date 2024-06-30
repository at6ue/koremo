import { Meta, StoryObj } from "@storybook/react";
import Redirecting from "../components/Redirecting";

const meta: Meta<typeof Redirecting> = {
  component: Redirecting,
};

export default meta;
type Story = StoryObj<typeof Redirecting>;

export const Default: Story = {};
