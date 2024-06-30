import { Meta, StoryObj } from "@storybook/react";
import ItemImage from "../components/ItemImage";

const meta: Meta<typeof ItemImage> = {
  component: ItemImage,
};

export default meta;
type Story = StoryObj<typeof ItemImage>;

export const NoImage: Story = {};

export const Image: Story = {
  args: { src: "/assets/thumb.webp", alt: "商品名" },
};
