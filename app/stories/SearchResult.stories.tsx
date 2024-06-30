import { Meta, StoryObj } from "@storybook/react";
import SearchResult from "../components/SearchResult";

const meta: Meta<typeof SearchResult> = {
  component: SearchResult,
};

export default meta;
type Story = StoryObj<typeof SearchResult>;

export const Default: Story = {
  args: {
    keyword: "キーワード",
    toNextPageUrl: () => ({}),
    fetcher: async (params) => ({
      total: 10,
      page: params.page,
      pageCount: 10,
      items: [
        {
          itemCode: params.keyword,
          itemImage: "",
          itemName: `商品名(${params.page})`,
          itemPrice: 9999,
          itemUrl: "",
          shopCode: "",
          shopName: "ショップ名",
          shopUrl: "",
          pointRate: 1,
          postageFlag: 1,
          reviewAverage: 0,
          reviewCount: 0,
        },
      ],
    }),
  },
};

export const Empty: Story = {
  args: {
    keyword: "EMPTY",
    shopCode: "shop",
    toNextPageUrl: () => ({}),
    fetcher: async (key) => ({
      total: 0,
      page: 1,
      pageCount: 1,
      items: [],
    }),
  },
};

export const Loading: Story = {
  args: {
    keyword: "LOADING",
    toNextPageUrl: () => ({}),
    fetcher: async () => new Promise(() => {}),
  },
};

export const NoMoreItems: Story = {
  args: {
    keyword: "NO MORE ITEMS",
    toNextPageUrl: () => ({}),
    fetcher: async (params) => ({
      total: 1,
      page: 1,
      pageCount: 1,
      items: [
        {
          itemCode: params.keyword,
          itemImage: "",
          itemName: "商品名",
          itemPrice: 9999,
          itemUrl: "",
          shopCode: "",
          shopName: "ショップ名",
          shopUrl: "",
          pointRate: 1,
          postageFlag: 1,
          reviewAverage: 0,
          reviewCount: 0,
        },
      ],
    }),
  },
};
