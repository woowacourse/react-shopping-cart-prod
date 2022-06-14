export interface Props {
  id: string;
  checked: boolean;
  marginBottom?: string;
  onChange: (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => void;
}
