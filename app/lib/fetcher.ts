import { Item, SortCondition } from "./types";

const apiUrl = process.env.NEXT_PUBLIC_SEARCH_API_URL;

const fetcher = (params: RakutenSearchParams) =>
  fetch(`${apiUrl}`, {
    method: "POST",
    headers: [["Content-Type", "application/x-www-form-urlencoded"]],
    body: toFormUrlEncoded(params),
    mode: "cors",
  }).then((res) => res.json().then(parse));

export { fetcher };

const toFormUrlEncoded = (params: RakutenSearchParams): string => {
  const { keyword, page, sort, shopCode } = params;
  const query = new URLSearchParams();
  query.set("keyword", keyword);
  query.set("page", `${page}`);
  query.set("sort", sort);
  if (shopCode) {
    query.set("shopCode", shopCode);
  }
  return query.toString();
};

const parse = (response: RakutenSearchResponse): ItemsPerPage => {
  const { Items, count: total, page, pageCount } = response;

  const items = Items.map((i) => i.Item).map((i) => {
    let itemImage = "";
    if (Array.isArray(i.mediumImageUrls) && 0 < i.mediumImageUrls.length) {
      itemImage = i.mediumImageUrls[0].imageUrl;
    } else if (Array.isArray(i.smallImageUrls) && 0 < i.smallImageUrls.length) {
      itemImage = i.smallImageUrls[0].imageUrl;
    }
    const {
      itemCode,
      itemName,
      itemPrice,
      itemUrl,
      shopCode,
      shopName,
      shopUrl,
      pointRate,
      postageFlag,
      reviewAverage,
      reviewCount,
    } = i;
    return {
      itemCode,
      itemName,
      itemPrice,
      itemUrl,
      itemImage,
      shopCode,
      shopName,
      shopUrl,
      pointRate,
      postageFlag,
      reviewAverage,
      reviewCount,
    };
  });

  return { items, total, page, pageCount };
};

export type RakutenSearchResponse = {
  /** 検索結果の総商品数 */
  count: number;
  /** 現在のページ番号 */
  page: number;
  pageCount: number;
  Items: { Item: RakutenItem }[];
};

type ItemImageUrl = {
  imageUrl: string;
};

export type RakutenItem = Item & {
  imageFlag: number;
  smallImageUrls?: ItemImageUrl[];
  mediumImageUrls?: ItemImageUrl[];
};

export type ItemsPerPage = {
  total: number;
  page: number;
  pageCount: number;
  items: Item[];
};

export type RakutenSearchParams = {
  keyword: string;
  page: number;
  pageCount: number;
  sort: SortCondition;
  shopCode: string;
};
