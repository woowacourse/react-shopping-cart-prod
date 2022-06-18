import StyledImageButton from "@/components/pages/home/image-button/ImageButton.styled";

function ImageButton({ children, onClick }) {
  return (
    <StyledImageButton type="button" onClick={onClick}>
      {children}
    </StyledImageButton>
  );
}

export default ImageButton;
