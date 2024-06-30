import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { UrlObject } from "url";
import { ItemsPerPage, RakutenSearchParams } from "../lib/fetcher";
import { Item, ItemCode, SearchParams } from "../lib/types";
import styles from "../styles/SearchResult.module.css";
import EmptyResult from "./EmptyResult";
import Error from "./Error";
import Loading from "./Loading";
import SearchConditions from "./SearchConditions";
import SearchResultHeader from "./SearchResultHeader";
import SearchResultList from "./SearchResultList";
import SortConditionDialog from "./SortConditionDialog";

type SearchResultProps = {
  keyword: string;
  shopName?: string;
  shopCode?: string;
  params?: Partial<SearchParams>;
  fetcher: (key: RakutenSearchParams) => Promise<ItemsPerPage>;
  toNextPageUrl: (itemCode: ItemCode) => UrlObject;
  onSelect: (item: Item) => void;
  onSearchParamsChange: (params: Partial<SearchParams>) => void;
};

export default function SearchResult(props: SearchResultProps) {
  const {
    keyword,
    shopName,
    shopCode,
    params,
    fetcher,
    toNextPageUrl,
    onSelect,
    onSearchParamsChange,
  } = props;

  const [sortConditionDialogVisible, setSortConditionDialogVisible] =
    useState<boolean>(false);

  const sort = params?.sort || "standard";
  const page = params?.page || 1;

  const { data, error } = useSWRImmutable<ItemsPerPage, any>(
    { keyword, page, shopCode, sort },
    fetcher,
    { dedupingInterval: 60 * 60 * 1000 }
  );

  useEffect(() => {
    setSortConditionDialogVisible(false);
  }, [params, keyword, shopCode]);

  if (error) {
    return <Error />;
  }

  const shopNameToDisplay =
    shopName ??
    data?.items.find((i) => i.shopCode === shopCode)?.shopName ??
    shopCode;

  return (
    <div className={styles.container}>
      <SearchResultHeader keyword={keyword} />
      <SearchConditions
        shopName={shopNameToDisplay}
        sort={sort}
        onSortConditionClick={() => setSortConditionDialogVisible(true)}
      />
      <SortConditionDialog
        sort={sort}
        onApply={(v) => onSearchParamsChange({ sort: v })}
        onClose={() => setSortConditionDialogVisible(false)}
        open={sortConditionDialogVisible}
      />
      {data ? (
        0 < data.items.length ? (
          <>
            <SearchResultList
              items={data.items}
              toNextPageUrl={toNextPageUrl}
              onSelect={onSelect}
            />
            <div className={styles.pagination}>
              <Pagination
                count={data.pageCount}
                page={page}
                onChange={(_, v) => onSearchParamsChange({ page: v })}
                shape="rounded"
                sx={{
                  display: "inline-block",
                }}
              />
            </div>
          </>
        ) : (
          <EmptyResult />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}
