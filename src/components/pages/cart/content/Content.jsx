import StyledContent from "@/components/pages/cart/content/Content.styled";

function Content({ children }) {
  return (
    <StyledContent>
      <div>{children}</div>
    </StyledContent>
  );
}

export default Content;
