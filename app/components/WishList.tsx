import StorefrontIcon from "@mui/icons-material/Storefront";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { IdentifiedItem, PurchaseOrderEntry } from "../lib/types";
import styles from "../styles/WishList.module.css";
import WishListItem from "./WishListItem";
import WishListIcon from "./icons/WishListIcon";

type WishListProps = {
  details: IdentifiedItem[];
  list: PurchaseOrderEntry[];
  storedAt: number;
  onStore: (details: IdentifiedItem[], list: PurchaseOrderEntry[]) => void;
  onRemove: (storedAt: number) => void;
  onUpdate: (list: PurchaseOrderEntry[]) => void;
};

export default function WishList(props: WishListProps) {
  const { details, list, storedAt, onStore, onRemove, onUpdate } = props;

  const subtotal = details
    .map((item) => (item?.itemPrice ?? 0) * findQuantityOrElse1(list, item))
    .reduce((acc, cur) => acc + cur, 0);
  const totalItems = details
    .map((item) => findQuantityOrElse1(list, item))
    .reduce((acc, cur) => acc + cur, 0);

  const shopName = details
    .map((item) => item.shopName)
    .find((shopName) => shopName);
  const shopUrl =
    details.map((item) => item.shopUrl).find((shopUrl) => shopUrl) || "";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.shop}>
          <Link href={shopUrl} target="_blank" className={styles.shopUrl}>
            <StorefrontIcon fontSize="small" />
            <span className={styles.shopName}>{shopName}</span>
          </Link>
        </div>
        {storedAt ? (
          <IconButton title="削除" onClick={() => onRemove(storedAt)}>
            <WishListIcon stored />
          </IconButton>
        ) : (
          <IconButton title="保存" onClick={() => onStore(details, list)}>
            <WishListIcon />
          </IconButton>
        )}
      </div>
      <div className={styles.subtotal}>
        <div>
          <span className={styles.subtotalTitle}>小計</span>
          <span>{`(${totalItems}商品)`}</span>
        </div>
        <div className={styles.subtotalPrice}>
          <span>
            {subtotal.toLocaleString("ja-JP", {
              maximumFractionDigits: 0,
            })}
          </span>
          <span className={styles.subtotalPriceUnit}>円</span>
        </div>
      </div>
      {details.map((item) => (
        <div className={styles.item} key={item.itemCode}>
          <WishListItem
            item={item}
            quantity={findQuantityOrElse1(list, item)}
            onQuantityChange={(itemCode, value) =>
              onUpdate([
                ...list.filter((e) => e.itemCode !== itemCode),
                { itemCode, quantity: value },
              ])
            }
          />
        </div>
      ))}
    </div>
  );
}

function findQuantityOrElse1(
  list: PurchaseOrderEntry[],
  item: IdentifiedItem
): number {
  return list.find((i) => i.itemCode === item.itemCode)?.quantity ?? 1;
}
