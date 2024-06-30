import { Meta, StoryObj } from "@storybook/react";
import SearchResultList from "../components/SearchResultList";

const meta: Meta<typeof SearchResultList> = {
  component: SearchResultList,
};

export default meta;
type Story = StoryObj<typeof SearchResultList>;

export const Default: Story = {
  args: {
    toNextPageUrl: () => ({}),
    items: [
      {
        itemCode: "a",
        itemImage: "",
        itemName: "商品名",
        itemPrice: 9999,
        itemUrl: "",
        shopCode: "",
        shopName: "ショップ名",
        shopUrl: "",
        pointRate: 1,
        postageFlag: 0,
        reviewAverage: 0,
        reviewCount: 0,
      },
      {
        itemCode: "b",
        itemImage: "",
        itemName: "商品名",
        itemPrice: 9999,
        itemUrl: "",
        shopCode: "",
        shopName: "ショップ名",
        shopUrl: "",
        pointRate: 3,
        postageFlag: 0,
        reviewAverage: 2.4,
        reviewCount: 1234,
      },
    ],
  },
};
