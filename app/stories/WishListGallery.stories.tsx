import { Meta, StoryObj } from "@storybook/react";
import WishListGallery from "../components/WishListGallery";

const meta: Meta<typeof WishListGallery> = {
  component: WishListGallery,
};

export default meta;
type Story = StoryObj<typeof WishListGallery>;

export const Default: Story = {
  args: {
    candidate: {
      keywords: ["ひとつめ の キーワード", "ふたつめ の キーワード"],
      list: [
        {
          itemCode: "item1",
          quantity: 9,
        },
      ],
      details: [
        {
          itemCode: "item1",
          itemImage: "",
          itemName: "選択された商品",
          itemPrice: 9999,
          itemUrl: "",
          shopCode: "",
          shopName: "ショップ名",
          shopUrl: "",
          pointRate: 0,
          postageFlag: 1,
          reviewAverage: 0,
          reviewCount: 0,
        },
      ],
    },
    wishList: [
      {
        storedAt: 1,
        keywords: ["a", "b", "c", "d", "e"],
        list: [],
        details: [
          itemWithCode("a"),
          itemWithCode("b"),
          itemWithCode("c"),
          itemWithCode("d"),
          itemWithCode("e"),
        ],
        version: 2,
      },
    ],
  },
};

function itemWithCode(itemCode: string) {
  return {
    itemCode,
    itemImage: "",
    itemName: "保存された商品",
    itemPrice: 9999,
    itemUrl: "",
    shopCode: "",
    shopName: "ショップ名",
    shopUrl: "",
    pointRate: 0,
    postageFlag: 1,
    reviewAverage: 0,
    reviewCount: 0,
  };
}

export const Empty: Story = {
  args: {
    wishList: [],
  },
};
