import SortIcon from "@mui/icons-material/Sort";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Chip } from "@mui/material";
import { SortCondition } from "../lib/types";
import styles from "../styles/SearchConditions.module.css";
import { toSortConditionLabel } from "./SortConditionDialog";

type SearchConditionsProps = {
  shopName?: string;
  sort: SortCondition;
  onSortConditionClick: () => void;
};

export default function SearchConditions(props: SearchConditionsProps) {
  const { shopName = "全商品", sort, onSortConditionClick } = props;
  return (
    <div className={styles.container}>
      <Chip
        icon={<StorefrontIcon fontSize="small" />}
        label={shopName}
        variant="filled"
      />
      <Chip
        icon={<SortIcon fontSize="small" />}
        label={toSortConditionLabel(sort)}
        variant="outlined"
        onClick={onSortConditionClick}
      />
    </div>
  );
}
