import { useState } from "react";
import { StoredWishListEntry } from "../hooks/useStoredWishList";
import { IdentifiedItem, PurchaseOrderEntry } from "../lib/types";
import styles from "../styles/WishListGallery.module.css";
import WishList from "./WishList";

type WishListGalleryProps = {
  candidate?: WishListCandidate;
  wishList: StoredWishListEntry[];
  onStore: (details: IdentifiedItem[], list: PurchaseOrderEntry[]) => number;
  onRemove: (storedAt: number) => void;
  onUpdate: (storedAt: number, list: PurchaseOrderEntry[]) => void;
};

export default function WishListGallery(props: WishListGalleryProps) {
  const { candidate, wishList, onStore, onRemove, onUpdate } = props;
  const [candidateStoredAt, setCandidateStoredAt] = useState(NaN);
  const [candidateList, setCandidateList] = useState(candidate?.list ?? []);

  return (
    <div className={styles.container}>
      {candidate && (
        <div className={styles.content}>
          <WishList
            details={candidate.details}
            list={candidateList}
            storedAt={candidateStoredAt}
            onStore={(details, list) =>
              setCandidateStoredAt(onStore(details, list))
            }
            onRemove={(storedAt) => {
              onRemove(storedAt);
              setCandidateStoredAt(NaN);
            }}
            onUpdate={setCandidateList}
          />
        </div>
      )}

      {wishList
        .sort((a, b) => b.storedAt - a.storedAt)
        .filter((entry) => entry.storedAt !== candidateStoredAt)
        .map(({ storedAt, list, details }) => (
          <div className={styles.content} key={storedAt}>
            <WishList
              details={details}
              list={list}
              storedAt={storedAt}
              onStore={onStore}
              onRemove={onRemove}
              onUpdate={(list) => onUpdate(storedAt, list)}
            />
          </div>
        ))}
    </div>
  );
}

export type WishListCandidate = Omit<
  StoredWishListEntry,
  "version" | "storedAt"
>;
