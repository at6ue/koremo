import CircularProgress from "@mui/material/CircularProgress";
import styles from "../styles/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <CircularProgress color="inherit" />
    </div>
  );
}
