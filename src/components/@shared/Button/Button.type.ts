export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium';
  marginTop?: string;
  reverse?: boolean;
  children: React.ReactNode;
}
