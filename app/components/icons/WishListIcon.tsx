import FilledPushPinIcon from "@mui/icons-material/PushPin";
import OutlinedPushPinIcon from "@mui/icons-material/PushPinOutlined";

const tilted = { transform: "rotate(15deg)" };

type WishListIconProps = {
  stored?: boolean;
};

export default function WishListIcon(props: WishListIconProps) {
  const { stored } = props;

  return stored ? (
    <FilledPushPinIcon sx={tilted} color="primary" />
  ) : (
    <OutlinedPushPinIcon sx={tilted} />
  );
}
