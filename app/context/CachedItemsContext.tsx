import { createContext, ReactNode, useEffect, useState } from "react";
import { Item } from "../lib/types";

const SESSION_STORAGE_KEY = "items";

type ItemCode = string;
type CachedItems = { [itemCode: ItemCode]: Item };
type ItemCache = {
  cachedItems: CachedItems;
  setCachedItems: (updated: CachedItems) => void;
};

const emptyCache: ItemCache = { cachedItems: {}, setCachedItems: () => {} };

export const CachedItemsContext = createContext<ItemCache>(emptyCache);

type CachedItemsContextProviderProps = {
  children?: ReactNode;
};

export function CachedItemsContextProvider({
  children,
}: CachedItemsContextProviderProps) {
  const [inMemoryCachedItems, setInMemoryCachedItems] = useState<CachedItems>(
    {}
  );

  // ブラウザで実行させるために必要
  useEffect(() => {
    setInMemoryCachedItems(
      parseOrEmptyObject(sessionStorage.getItem(SESSION_STORAGE_KEY))
    );
  }, []);

  const setCachedItems = (updated: CachedItems) => {
    setInMemoryCachedItems(updated);
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <CachedItemsContext.Provider
      value={{ cachedItems: inMemoryCachedItems, setCachedItems }}
    >
      {children}
    </CachedItemsContext.Provider>
  );
}

const parseOrEmptyObject = (jsonOrOther: string | null): CachedItems => {
  if (jsonOrOther) {
    try {
      const parsed = JSON.parse(jsonOrOther);
      if (validate(parsed)) {
        return parsed;
      }
    } catch {
      // fall through
    }
  }
  return {};
};

const validate = (items: unknown): items is CachedItems => {
  if (!items || typeof items !== "object") return false;
  return Object.values(items).every((item) =>
    Object.keys(emptyItem).every((key) => key in item)
  );
};

const emptyItem: Item = {
  itemCode: "",
  itemName: "",
  itemPrice: NaN,
  itemImage: "",
  itemUrl: "",
  shopCode: "",
  shopName: "",
  shopUrl: "",
  pointRate: 0,
  postageFlag: 0,
  reviewAverage: 0,
  reviewCount: 0,
};
