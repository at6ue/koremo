import Image from "next/image";
import styles from "../styles/ItemImage.module.css";

type ItemImageProps = {
  alt: string;
  src?: string;
  size?: number;
};

export default function ItemImage(props: ItemImageProps) {
  const { src, alt, size } = props;

  return (
    <div
      className={styles.container}
      style={(size && { width: size, height: size }) || {}}
    >
      {src ? (
        <Image src={src} alt={alt} fill objectFit="contain" />
      ) : (
        <span>画像なし</span>
      )}
    </div>
  );
}
