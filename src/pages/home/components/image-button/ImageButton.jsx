import cn from "classnames";
import styles from "@home/components/image-button/image-button.module";

function ImageButton({ children, onClick, className }) {
  return (
    <button
      className={cn(styles.imageButton, className)}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ImageButton;
