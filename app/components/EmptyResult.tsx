import styles from "../styles/EmptyResult.module.css";

export default function EmptyResult() {
  return (
    <div className={styles.container}>
      ご指定の検索条件に該当する商品はみつかりませんでした
    </div>
  );
}
