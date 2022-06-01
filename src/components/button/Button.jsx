import StyledButton from "@/components/button/Button.styled";

function Button({
  type = "button",
  width,
  height,
  backgroundColor,
  borderRadius,
  fontSize,
  text,
  disabled,
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
    >
      {text}
    </StyledButton>
  );
}

export default Button;
