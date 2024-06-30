import { useEffect, useState } from "react";
import * as v from "valibot";
import { IdentifiedItem, PurchaseOrderEntry } from "../lib/types";

const version = 2 as const;

const StoredWishListEntryV1Schema = v.pipe(
  v.object({
    storedAt: v.number(),
    items: v.array(
      v.looseObject({ shopCode: v.string(), itemCode: v.string() })
    ),
    version: v.literal(1),
  }),
  v.transform(
    (v1): StoredWishListEntryV2 => ({
      storedAt: v1.storedAt,
      keywords: [],
      details: v1.items,
      list: [],
      version: 2 as const,
    })
  )
);

const StoredWishListEntryV2Schema = v.object({
  storedAt: v.number(),
  keywords: v.array(v.string()),
  details: v.array(
    v.looseObject({ shopCode: v.string(), itemCode: v.string() })
  ),
  list: v.optional(
    v.array(v.object({ itemCode: v.string(), quantity: v.number() })),
    []
  ),
  version: v.literal(2),
});

type StoredWishListEntryV1 = v.InferInput<typeof StoredWishListEntryV1Schema>;
type StoredWishListEntryV2 = v.InferOutput<typeof StoredWishListEntryV2Schema>;
type MixedStoredWishListEntry = StoredWishListEntryV1 | StoredWishListEntryV2;

export type StoredWishListEntry = StoredWishListEntryV2;

const isValidStoredWishListEntry = (
  e: unknown
): e is MixedStoredWishListEntry =>
  v.is(StoredWishListEntryV1Schema, e) || v.is(StoredWishListEntryV2Schema, e);

const key = "wishlist";

const loadWishListFromLocalStorage = (): StoredWishListEntry[] => {
  const raw: unknown = JSON.parse(window.localStorage.getItem(key) ?? "[]");
  if (!Array.isArray(raw)) return [];

  return raw.filter(isValidStoredWishListEntry).map((wishlist) => {
    switch (wishlist.version) {
      case 1:
        wishlist = v.parse(StoredWishListEntryV1Schema, wishlist);
      case 2:
        wishlist = v.parse(StoredWishListEntryV2Schema, wishlist);
    }
    return wishlist;
  });
};

const useStoredWishList = () => {
  const [wishList, setWishList] = useState<StoredWishListEntry[]>([]);

  // ブラウザで実行させるために必要
  useEffect(() => {
    setWishList(loadWishListFromLocalStorage());
  }, []);

  const store = (
    keywords: string[],
    details: IdentifiedItem[],
    list: PurchaseOrderEntry[]
  ): number => {
    const timestamp = Date.now();
    const updated = [
      ...wishList,
      {
        storedAt: timestamp,
        keywords,
        details,
        list,
        version,
      },
    ];
    window.localStorage.setItem(key, JSON.stringify(updated));
    setWishList(updated);
    return timestamp;
  };

  const remove = (storedAt: number) => {
    const updated = wishList.filter((entry) => entry.storedAt !== storedAt);
    window.localStorage.setItem(key, JSON.stringify(updated));
    setWishList(updated);
  };

  const update = (storedAt: number, list: PurchaseOrderEntry[]) => {
    const updated = wishList.map((entry) =>
      entry.storedAt === storedAt ? { ...entry, list } : entry
    );
    window.localStorage.setItem(key, JSON.stringify(updated));
    setWishList(updated);
  };

  return { wishList, store, remove, update };
};

export default useStoredWishList;
