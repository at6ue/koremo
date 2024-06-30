import Landing from "../components/Landing";
import Loading from "../components/Loading";
import usePageQuery from "../hooks/usePageQuery";
import useStoredWishList from "../hooks/useStoredWishList";

export default function Home() {
  const [pageQuery, setPageQuery] = usePageQuery();
  const { wishList } = useStoredWishList();

  if (!pageQuery) {
    return <Loading />;
  }

  return (
    <Landing
      keywords={[...pageQuery.keywords]}
      hasItemsInWishList={0 < wishList.length}
      start={(keywords) => {
        // 検索ワードをクエリに保持しておく
        // history.pushState だと history.back で再描画されない
        setPageQuery({ keywords });
        setPageQuery({ keywords }, "/search");
      }}
    />
  );
}
