import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { SortCondition } from "../lib/types";

type Pathname = "/" | "/wishlist" | "/search";

type ShopCode = string;
type ItemId = string;

type PageQuery = {
  keywords: string[];
  selections: ItemId[];
  shopCode?: ShopCode;
  page?: number;
  sort?: SortCondition;
};

const queryNames = {
  keywords: "q",
  selections: "p",
  shopCode: "f",
  page: "n",
  sort: "o",
} as const;

const usePageQuery = () => {
  const [state, setState] = useState<PageQuery | undefined>();
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;

    setState(fromUrlQuery(router.query));
  }, [router.isReady, router.query]);

  const setPageQuery = (query: Partial<PageQuery>, pathname?: Pathname) => {
    router.push({ pathname, query: toUrlQuery(query) });
  };

  return [state, setPageQuery] as const;
};

const fromUrlQuery = (query: ParsedUrlQuery): PageQuery => {
  const toArray = (v: string | string[] | undefined): string[] => {
    if (typeof v === "string") return !!v ? [v] : [];
    return v ? v.filter(notEmpty) : [];
  };

  const getFirst = (v: string | string[] | undefined): string | undefined => {
    if (typeof v === "string") return !!v ? v : undefined;
    return v ? v[0] : v;
  };

  return {
    keywords: toArray(query[queryNames.keywords]),
    selections: toArray(query[queryNames.selections]),
    shopCode: getFirst(query[queryNames.shopCode]),
    page: Number(getFirst(query[queryNames.page])),
    sort: toSortCondition(getFirst(query[queryNames.sort])),
  };
};

export const toUrlQuery = (state: Partial<PageQuery>) => {
  const q: { [name: string]: string | string[] | undefined } = {};
  if (state.keywords?.length) {
    q[queryNames.keywords] = [...state.keywords.filter(notEmpty)];
  }
  if (state.selections?.length) {
    q[queryNames.selections] = [...state.selections.filter(notEmpty)];
  }
  if (state.shopCode) {
    q[queryNames.shopCode] = state.shopCode;
  }
  if (state.page) {
    q[queryNames.page] = state.page.toString();
  }
  if (state.sort) {
    q[queryNames.sort] = state.sort;
  }
  return q;
};

const toSortCondition = (v: string | undefined): SortCondition | undefined => {
  return v as SortCondition;
};

const notEmpty = (v: string) => !!v;

export default usePageQuery;
