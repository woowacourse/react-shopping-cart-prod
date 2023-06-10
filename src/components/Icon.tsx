function Icon({
  fontSize,
  children,
}: {
  fontSize: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ fontSize: fontSize, display: "flex", justifyContent: "center" }}
    >
      {children}
    </div>
  );
}

export default Icon;
