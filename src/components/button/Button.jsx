import StyledButton from "@/components/button/Button.styled";

function Button({
  type = "button",
  width,
  height,
  backgroundColor,
  borderRadius,
  fontSize,
  text,
}) {
  return (
    <StyledButton
      type={type}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      fontSize={fontSize}
    >
      {text}
    </StyledButton>
  );
}

export default Button;
