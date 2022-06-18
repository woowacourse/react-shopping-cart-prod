import StyledButton from "@/components/common/button/Button.styled";

function Button({
  type = "button",
  width,
  height,
  backgroundColor,
  borderRadius,
  fontSize,
  text,
  disabled,
  onClick,
}) {
  return (
    <StyledButton
      type={type}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      fontSize={fontSize}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
}

export default Button;
