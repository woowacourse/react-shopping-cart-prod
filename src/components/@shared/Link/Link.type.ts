import { To } from 'react-router-dom';

export interface Props {
  to: To;
  disabled?: boolean;
  children: React.ReactNode;
}
