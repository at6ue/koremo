import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { RakutenItem, RakutenSearchResponse } from "../lib/fetcher";

const apiUrl = process.env.NEXT_PUBLIC_SEARCH_API_URL;
const raw = require(process.env.NEXT_PUBLIC_MOCK_RESPONSE_PATH!);
const pageSize = 10;

type ParameterValue = string | string[];

type RequestParams = {
  shopCode?: ParameterValue;
  sort?: ParameterValue;
  page?: ParameterValue;
};

const sorter = (
  sort: any
): ((a: { Item: RakutenItem }, b: { Item: RakutenItem }) => number) => {
  switch (sort) {
    case "+itemPrice":
      return (a, b) => a.Item.itemPrice - b.Item.itemPrice;
    case "-itemPrice":
      return (a, b) => b.Item.itemPrice - a.Item.itemPrice;
    case "-reviewCount":
      return (a, b) => b.Item.reviewCount - a.Item.reviewCount;
    case "-reviewAverage":
      return (a, b) => b.Item.reviewAverage - a.Item.reviewAverage;
    default:
      return () => 0;
  }
};

const handlers = [
  http.post(apiUrl!, async ({ request }) => {
    const body: RakutenSearchResponse = raw as any;
    const formData = (await request.formData()) ?? {};
    const shopCode = formData.get("shopCode");
    const sort = formData.get("sort");
    const _page = formData.get("_page");

    const items = shopCode
      ? body.Items.filter((i) => i.Item.shopCode === shopCode)
      : body.Items;
    items.sort(sorter(sort));

    const count = items.length;
    const page = Number(_page) || 1;

    return HttpResponse.json({
      Items: items.slice((page - 1) * pageSize, page * pageSize),
      count,
      page,
      pageCount: Math.ceil(count / pageSize),
    });
  }),
];

export const worker = setupWorker(...handlers);
