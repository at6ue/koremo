import { useContext } from "react";
import Loading from "../components/Loading";
import Redirecting from "../components/Redirecting";
import WishListGallery from "../components/WishListGallery";
import BackButton from "../components/buttons/BackButton";
import { CachedItemsContext } from "../context/CachedItemsContext";
import usePageQuery from "../hooks/usePageQuery";
import useStoredWishList from "../hooks/useStoredWishList";
import { IdentifiedItem, PurchaseOrderEntry } from "../lib/types";
import styles from "../styles/WishListPage.module.css";

export default function WishListPage() {
  const [query, setPageQuery] = usePageQuery();
  const { wishList, store, remove, update } = useStoredWishList();

  const { cachedItems } = useContext(CachedItemsContext);

  if (!query) {
    return <Loading />;
  }

  const { selections, shopCode, keywords } = query;

  const nothingToList = selections.length <= 0 && wishList.length <= 0;
  const noItemsSelected = 0 < selections.length && !shopCode;
  if (nothingToList || noItemsSelected) {
    setPageQuery({ keywords }, "/");
    return <Redirecting />;
  }

  const candidate =
    shopCode && selections.length
      ? {
          ...buildListAndDetails(
            selections
              .map((id) => `${shopCode}:${id}`)
              .map((itemCode) => ({
                ...(cachedItems[itemCode] ?? {}),
                itemCode,
                shopCode,
              }))
          ),
          keywords,
        }
      : undefined;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <BackButton />
        {/* <span>トップページに戻る</span> */}
      </header>
      <WishListGallery
        candidate={candidate}
        wishList={wishList}
        onStore={(details, list) => store(keywords, details, list)}
        onRemove={remove}
        onUpdate={update}
      />
    </div>
  );
}

const buildListAndDetails = (items: IdentifiedItem[]) => {
  const details: IdentifiedItem[] = [];
  const list: PurchaseOrderEntry[] = [];
  for (const detail of items) {
    const { itemCode } = detail;
    const duplicate = list.find((i) => i.itemCode === detail.itemCode);
    if (duplicate) {
      duplicate.quantity++;
    } else {
      list.push({ itemCode, quantity: 1 });
      details.push({ ...detail });
    }
  }
  return { details, list };
};
