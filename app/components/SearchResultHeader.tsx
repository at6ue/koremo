import { TextField } from "@mui/material";
import styles from "../styles/SearchResultHeader.module.css";
import BackButton from "./buttons/BackButton";

type SearchResultHeaderProps = {
  keyword: string;
  onBackButtonClick?: () => void;
};

export default function SearchResultHeader(props: SearchResultHeaderProps) {
  const { keyword, onBackButtonClick } = props;

  return (
    <div className={styles.container}>
      <BackButton onClick={onBackButtonClick} />
      <TextField value={keyword} variant="standard" fullWidth disabled />
    </div>
  );
}
