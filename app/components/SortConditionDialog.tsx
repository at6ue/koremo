import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { SortCondition } from "../lib/types";

type SortConditionDialogProps = {
  sort: SortCondition;
  open: boolean;
  onApply: (sort: SortCondition) => void;
  onClose?: () => void;
};

const sortConditions: { value: SortCondition; label: string }[] = [
  { value: "standard", label: "標準" },
  { value: "+itemPrice", label: "安い順" },
  { value: "-itemPrice", label: "高い順" },
  { value: "+updateTimestamp", label: "新着順" },
  { value: "-reviewCount", label: "レビュー件数順" },
  { value: "-reviewAverage", label: "レビュー評価順" },
];

export const toSortConditionLabel = (sort: SortCondition): string => {
  return sortConditions.find((c) => c.value === sort)!.label;
};

export default function SortConditionDialog(props: SortConditionDialogProps) {
  const { sort, open, onApply, onClose } = props;
  const { control, handleSubmit, setValue } = useForm<{ sort: SortCondition }>({
    defaultValues: { sort },
  });
  useEffect(() => {
    setValue("sort", sort);
  }, [sort, setValue]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>並べ替え</DialogTitle>
      <DialogContent>
        <Controller
          name="sort"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="standard"
                control={<Radio />}
                label="標準"
              />
              <FormControlLabel
                value="+itemPrice"
                control={<Radio />}
                label="安い順"
              />
              <FormControlLabel
                value="-itemPrice"
                control={<Radio />}
                label="高い順"
              />
              <FormControlLabel
                value="+updateTimestamp"
                control={<Radio />}
                label="新着順"
              />
              <FormControlLabel
                value="-reviewCount"
                control={<Radio />}
                label="レビュー件数順"
              />
              <FormControlLabel
                value="-reviewAverage"
                control={<Radio />}
                label="レビュー評価順"
              />
            </RadioGroup>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" fullWidth>
          キャンセル
        </Button>
        <Button
          onClick={handleSubmit((data) => {
            onApply(data.sort);
            onClose && onClose();
          })}
          variant="contained"
          fullWidth
        >
          適用
        </Button>
      </DialogActions>
    </Dialog>
  );
}
