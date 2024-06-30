import StorefrontIcon from "@mui/icons-material/Storefront";
import { Rating } from "@mui/material";
import { Item } from "../lib/types";
import styles from "../styles/SearchResultItem.module.css";
import ItemImage from "./ItemImage";

type SearchResultItemProps = {
  item: Item;
};

export default function SearchResultItem(props: SearchResultItemProps) {
  const {
    itemImage,
    itemName,
    itemPrice,
    shopName,
    shopUrl,
    pointRate,
    postageFlag,
    reviewCount,
    reviewAverage,
  } = props.item;

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <ItemImage src={itemImage} alt={itemName} />
        <div className="tags"></div>
      </div>
      <div className={styles.descriptions}>
        <div>
          <h2 className={styles.itemName}>{itemName}</h2>
        </div>
        <div className={styles.price}>
          <div>
            <span className={styles.itemPrice}>
              {itemPrice.toLocaleString("ja-JP", {
                maximumFractionDigits: 0,
              })}
            </span>
            <span className={styles.priceUnit}>円</span>
          </div>
          {postageFlag == 0 && <span>送料無料</span>}
        </div>
        {1 < pointRate && (
          <div className={styles.pointRate}>ポイント{pointRate}倍</div>
        )}
        {0 < reviewCount && (
          <div className={styles.review}>
            <Rating
              value={reviewAverage}
              size="small" // もっと小さくしたい
              precision={0.1}
              readOnly
            ></Rating>
            <span className={styles.reviewAverage}>{reviewAverage}</span>
            <span className={styles.reviewCount}>
              ({reviewCount.toLocaleString("ja-JP")}
              件)
            </span>
          </div>
        )}
        <div>
          <div
            className={styles.shopName}
            role="link"
            onClick={(e) => {
              window.open(shopUrl, "_blank");
              e.preventDefault();
            }}
          >
            <StorefrontIcon fontSize="inherit" />
            <div>{shopName}</div>
          </div>
        </div>
      </div>
      {/* <button></button> */}
    </div>
  );
}
