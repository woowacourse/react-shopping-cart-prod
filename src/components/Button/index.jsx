import StyledButton from "@/components/Button/index.styled";

function Button({ type = "button", children, disabled, onClick }) {
  return (
    <StyledButton type={type} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default Button;
