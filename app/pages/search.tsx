import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Redirecting from "../components/Redirecting";
import SearchResult from "../components/SearchResult";
import { CachedItemsContext } from "../context/CachedItemsContext";
import usePageQuery, { toUrlQuery } from "../hooks/usePageQuery";
import { fetcher } from "../lib/fetcher";
import { Item } from "../lib/types";

export default function SearchPage() {
  const [query, setPageQuery] = usePageQuery();
  const { cachedItems, setCachedItems } = useContext(CachedItemsContext);
  const [shopName, setShopName] = useState<string>();

  useEffect(() => {
    if (!query?.selections?.length) {
      setShopName(undefined);
    }
  }, [query]);

  if (!query) {
    return <Loading />;
  }

  const { keywords, selections, shopCode } = query;
  if (!keywords.length || (0 < selections.length && !shopCode)) {
    setPageQuery({ keywords: keywords }, "/");
    return <Redirecting />;
  }

  const keyword = keywords[selections.length];

  return (
    <SearchResult
      fetcher={fetcher}
      keyword={keyword}
      shopName={shopName}
      shopCode={shopCode}
      params={query}
      toNextPageUrl={(itemCode) => {
        const [shopCode, itemId] = itemCode.split(":");
        const selectedItems = [...selections, itemId];
        return {
          pathname:
            keywords.length === selectedItems.length ? "/wishlist" : "/search",
          query: toUrlQuery({
            keywords: query.keywords,
            selections: selectedItems,
            shopCode: query.shopCode ?? shopCode,
            sort: query.sort,
          }),
        };
      }}
      onSelect={(item: Item) => {
        setCachedItems({ ...cachedItems, [item.itemCode]: item });
        setShopName(item.shopName);
      }}
      onSearchParamsChange={(params) => {
        setPageQuery(
          params.page
            ? { ...query, ...params }
            : { ...query, ...params, page: 1 }
        );
      }}
    />
  );
}
