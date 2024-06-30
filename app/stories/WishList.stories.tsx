import { Meta, StoryObj } from "@storybook/react";
import WishList from "../components/WishList";

const meta: Meta<typeof WishList> = {
  component: WishList,
};

export default meta;
type Story = StoryObj<typeof WishList>;

export const Default: Story = {
  args: {
    details: [
      {
        itemCode: "",
        itemImage: "/assets/thumb.webp",
        itemName:
          "01234567890123456789012345678901234567890123456789" +
          "01234567890123456789012345678901234567890123456789" +
          "01234567890123456789012345678901234567890123456789",
        itemPrice: 9999,
        itemUrl: "",
        shopCode: "",
        shopName:
          "01234567890123456789012345678901234567890123456789" +
          "01234567890123456789012345678901234567890123456789",
        shopUrl: "",
        pointRate: 3,
        postageFlag: 1,
        reviewAverage: 2.4,
        reviewCount: 1234,
      },
    ],
    list: [],
  },
};
