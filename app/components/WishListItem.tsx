import { Select } from "@mui/material";
import Link from "next/link";
import { IdentifiedItem, ItemCode } from "../lib/types";
import styles from "../styles/WishListItem.module.css";
import ItemImage from "./ItemImage";

type WishListItemProps = {
  item: IdentifiedItem;
  quantity: number;
  onQuantityChange: (item: ItemCode, value: number) => void;
};

export default function WishListItem(props: WishListItemProps) {
  const {
    itemCode,
    itemImage,
    itemName,
    itemPrice,
    itemUrl,
    pointRate,
    postageFlag,
  } = props.item;

  return (
    <div className={styles.itemContainer}>
      <Link href={itemUrl ?? ""} target="_blank" className={styles.image}>
        <ItemImage src={itemImage} alt={itemName ?? ""} size={75} />
      </Link>
      <Link href={itemUrl ?? ""} target="_blank" className={styles.itemName}>
        {itemName}
      </Link>
      <div className={styles.price}>
        <div className={styles.priceContainer}>
          <span>価格</span>
          <span className={styles.itemPrice}>
            {itemPrice?.toLocaleString("ja-JP", {
              maximumFractionDigits: 0,
            }) ?? "-"}
          </span>
          <span>円</span>
        </div>
        <div className={styles.postage}>
          {postageFlag == 0 ? (
            <span className={styles.postageIncluded}>送料無料</span>
          ) : (
            <span>送料別</span>
          )}
        </div>
        {pointRate && 1 < pointRate && (
          <div className={styles.pointRate}>ポイント{pointRate}倍</div>
        )}
      </div>
      <div className={styles.quantity}>
        <span>数量</span>
        <Select
          native
          variant="outlined"
          size="small"
          className={styles.quantitySelect}
          value={props.quantity}
          onChange={(e) => {
            props.onQuantityChange(itemCode, Number(e.target.value));
          }}
        >
          {Array.from({ length: 200 }, (_, i) => i + 1).map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
