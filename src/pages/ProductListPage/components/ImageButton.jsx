import cn from "classnames";

function ImageButton({ children, onClick, className }) {
  return (
    <button className={cn(className)} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default ImageButton;
