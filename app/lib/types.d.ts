export type Item = {
  itemCode: string;
  itemName: string;
  itemPrice: number;
  itemImage: string;
  itemUrl: string;
  shopCode: string;
  shopName: string;
  shopUrl: string;
  pointRate: number;
  // "pointRateEndTime": "",
  // "pointRateStartTime": "",
  postageFlag: number;
  reviewAverage: number;
  reviewCount: number;
};

export type PurchaseOrderEntry = {
  itemCode: string;
  quantity: number;
};

type ItemIdentifier = {
  shopCode: string;
  itemCode: string;
};

export type IdentifiedItem = ItemIdentifier & Partial<Item>;

export type SortCondition =
  | "standard"
  | "+itemPrice"
  | "-itemPrice"
  | "+updateTimestamp"
  | "-reviewCount"
  | "-reviewAverage";

export type SearchParams = {
  page: number;
  sort: SortCondition;
};

export type ItemCode = string;
