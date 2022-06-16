import StyledTitle from "@/components/Title/index.styled";

export default function Title({ titleType = "pageTitle", children }) {
  return (
    <StyledTitle>
      <div className={titleType}>{children}</div>
      <hr />
    </StyledTitle>
  );
}
