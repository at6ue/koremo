import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "../styles/Landing.module.css";
import WishListIcon from "./icons/WishListIcon";

type LandingProps = {
  keywords: string[];
  hasItemsInWishList: boolean;
  start: (keywords: string[]) => void;
};

export default function Landing(props: LandingProps) {
  const { keywords, hasItemsInWishList, start } = props;
  const [
    informationHandlingDescriptionOpen,
    setInformationHandlingDescriptionOpen,
  ] = useState(false);
  const { control, register, handleSubmit, setValue, setFocus } = useForm({
    defaultValues: {
      keywords: toKeywordFormValue(keywords),
    },
  });
  const { fields, insert, remove } = useFieldArray({
    name: "keywords",
    control,
  });

  useEffect(() => {
    setValue("keywords", toKeywordFormValue(keywords));
  }, [keywords, setValue]);

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <h1>koremo</h1>
        <p>
          楽天市場で
          <strong>これも一緒に</strong>
          買えるお店を探そう
        </p>
      </section>
      <form
        className={styles.form}
        onSubmit={handleSubmit((data) => {
          const validKeywords = data.keywords
            .map((v) => v.keyword)
            .filter(notEmpty);
          if (validKeywords.length) {
            start(validKeywords);
          } else {
            setFocus("keywords.0.keyword");
          }
        })}
      >
        {fields.map((field, index) => (
          <div className={styles.keyword} key={index}>
            <IconButton
              title="削除"
              size="small"
              onClick={() =>
                1 < fields.length
                  ? remove(index)
                  : setValue(`keywords.${index}.keyword`, "")
              }
            >
              <DeleteIcon />
            </IconButton>
            <TextField
              key={field.id}
              label={`${index + 1} つめのキーワード`}
              variant="standard"
              fullWidth
              {...register(`keywords.${index}.keyword`)}
            />
            <IconButton
              name="追加"
              title="追加"
              size="small"
              onClick={() => insert(index + 1, { keyword: "" })}
            >
              <AddIcon />
            </IconButton>
          </div>
        ))}
        <Button type="submit" variant="contained" fullWidth>
          楽天市場から探す
        </Button>
        <Button
          variant="text"
          color="info"
          size="small"
          startIcon={<InfoIcon />}
          onClick={() => setInformationHandlingDescriptionOpen(true)}
        >
          このサイトが送信する情報について
        </Button>
        <Dialog
          open={informationHandlingDescriptionOpen}
          onClose={() => setInformationHandlingDescriptionOpen(false)}
        >
          <DialogTitle>このサイトが送信する情報について</DialogTitle>
          <DialogContent>
            <p>
              このサイトに入力された情報は、楽天市場の商品一覧を取得する目的で
              <Link href="https://corp.rakuten.co.jp/">
                楽天グループ株式会社
              </Link>
              が運営する
              <Link href="https://webservice.rakuten.co.jp/">
                楽天ウェブサービス
              </Link>
              に送信します。
              楽天ウェブサービスの利用規約を遵守するため、通信はこのサイトの管理するサーバーを経由して行われますが、内容は一切保存していません。
            </p>
            <p>
              また、「保存したリスト」はお使いのブラウザに格納されており、外部には送信されません。
            </p>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              variant="outlined"
              fullWidth
              onClick={() => setInformationHandlingDescriptionOpen(false)}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      {hasItemsInWishList && (
        <Link href="/wishlist" className={styles.wishlist}>
          <WishListIcon stored />
          保存したリストを開く
        </Link>
      )}
    </div>
  );
}

const notEmpty = (v: string) => !!v;

const toKeywordFormValue = (keywords: string[]): { keyword: string }[] => {
  return 0 < keywords.length
    ? keywords.map((keyword) => ({ keyword }))
    : [{ keyword: "" }, { keyword: "" }];
};
