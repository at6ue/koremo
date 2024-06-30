import Link from "next/link";
import { UrlObject } from "url";
import { Item, ItemCode } from "../lib/types";
import styles from "../styles/SearchResultList.module.css";
import SearchResultItem from "./SearchResultItem";

type SearchResultListProps = {
  items: Item[];
  toNextPageUrl: (item: ItemCode) => UrlObject;
  onSelect: (item: Item) => void;
};

export default function SearchResultList(props: SearchResultListProps) {
  const { items, toNextPageUrl, onSelect } = props;
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div key={item.itemCode} className={styles.item}>
          <Link
            href={toNextPageUrl(item.itemCode)}
            prefetch={false}
            className={styles.link}
            onClick={() => onSelect(item)}
          >
            <SearchResultItem item={item}></SearchResultItem>
          </Link>
        </div>
      ))}
    </div>
  );
}
