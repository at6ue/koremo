import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

type BackButtonProps = {
  onClick?: () => void;
};

export default function BackButton(props: BackButtonProps) {
  return (
    <IconButton
      title="戻る"
      onClick={
        props.onClick ??
        (() => {
          history.back();
        })
      }
    >
      <ArrowBackIcon />
    </IconButton>
  );
}
